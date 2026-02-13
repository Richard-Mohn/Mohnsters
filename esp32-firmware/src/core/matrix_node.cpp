// ================================================================
// MohnMatrix Node Worker — Implementation
//
// Registers this device as a MohnMatrix network node and sends
// periodic heartbeats. The heartbeat payload includes system
// stats so the MohnMatrix admin dashboard can monitor ESP32 nodes
// alongside PC agents.
//
// Credentials (nodeId + nodeSecret) are persisted in NVS so the
// device auto-reconnects after power cycles.
// ================================================================

#include "matrix_node.h"

#if ENABLE_MATRIX_NODE

#include "aquarium.h"
#include "identity.h"

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Preferences.h>

// ============================================================
// NVS keys
// ============================================================
#define MATRIX_NVS_NS       "mohnmatrix"
#define MATRIX_NVS_NODE_ID  "node_id"
#define MATRIX_NVS_SECRET   "node_secret"
#define MATRIX_NVS_ENROLL   "enroll_key"
#define MATRIX_NVS_POINTS   "points"
#define MATRIX_NVS_SEARCHES "searches"

// ============================================================
// Internal state
// ============================================================
namespace {
  Preferences _matrixPrefs;
  MatrixNodeStatus _status = {};
  String _enrollmentKey;
  unsigned long _lastHeartbeatAt = 0;
}

// ============================================================
// Init — load saved credentials
// ============================================================
void MatrixNode::init() {
  _matrixPrefs.begin(MATRIX_NVS_NS, true); // read-only
  _status.nodeId       = _matrixPrefs.getString(MATRIX_NVS_NODE_ID, "");
  _status.nodeSecret   = _matrixPrefs.getString(MATRIX_NVS_SECRET, "");
  _enrollmentKey       = _matrixPrefs.getString(MATRIX_NVS_ENROLL, "");
  _status.pointsEarned = _matrixPrefs.getUInt(MATRIX_NVS_POINTS, 0);
  _status.searchesRouted = _matrixPrefs.getUInt(MATRIX_NVS_SEARCHES, 0);
  _matrixPrefs.end();

  _status.registered = _status.nodeId.length() > 0 && _status.nodeSecret.length() > 0;

  if (_status.registered) {
    Serial.printf("[MatrixNode] Loaded credentials — nodeId: %s\n", _status.nodeId.c_str());
  } else {
    Serial.println("[MatrixNode] Not registered yet. Set enrollment key via BLE or serial.");
  }
}

// ============================================================
// Register with MohnMatrix cloud
// ============================================================
bool MatrixNode::registerNode(const String& enrollmentKey) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[MatrixNode] Cannot register — WiFi not connected");
    return false;
  }

  Serial.println("[MatrixNode] Registering with MohnMatrix cloud...");

  HTTPClient http;
  String url = String(MATRIX_API_URL) + MATRIX_REGISTER_PATH;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(15000);

  // Build registration payload (matches the /api/nodes/register schema)
  JsonDocument doc;
  doc["enrollmentKey"] = enrollmentKey;
  doc["hostname"]      = String(BOARD_NAME) + "_" + Identity::getMacId();
  doc["platform"]      = "esp32";
  doc["arch"]          = "xtensa"; // ESP32-S3 is xtensa lx7
  doc["cpuModel"]      = BOARD_NAME;
  doc["cpuCores"]      = 2;
  doc["totalMem"]      = ESP.getHeapSize();

  String payload;
  serializeJson(doc, payload);

  Serial.printf("[MatrixNode] POST %s\n", url.c_str());
  int httpCode = http.POST(payload);

  if (httpCode == 200 || httpCode == 201) {
    String response = http.getString();
    Serial.printf("[MatrixNode] Registered! Response: %s\n", response.c_str());

    JsonDocument resp;
    if (deserializeJson(resp, response) == DeserializationError::Ok) {
      _status.nodeId     = resp["nodeId"].as<String>();
      _status.nodeSecret = resp["nodeSecret"].as<String>();
      _status.registered = true;

      // Persist credentials
      _matrixPrefs.begin(MATRIX_NVS_NS, false);
      _matrixPrefs.putString(MATRIX_NVS_NODE_ID, _status.nodeId);
      _matrixPrefs.putString(MATRIX_NVS_SECRET, _status.nodeSecret);
      _matrixPrefs.putString(MATRIX_NVS_ENROLL, enrollmentKey);
      _matrixPrefs.end();

      Serial.printf("[MatrixNode] Node ID: %s\n", _status.nodeId.c_str());
    }
    http.end();
    return true;
  } else {
    Serial.printf("[MatrixNode] Registration failed — HTTP %d\n", httpCode);
    String body = http.getString();
    Serial.printf("[MatrixNode] Response: %s\n", body.c_str());
    http.end();
    return false;
  }
}

// ============================================================
// Tick — called from main loop; handles heartbeat timing
// ============================================================
void MatrixNode::tick(unsigned long nowMs) {
  if (!_status.registered) {
    // Try auto-register if we have an enrollment key but aren't registered
    if (_enrollmentKey.length() > 0 && (nowMs - _lastHeartbeatAt > 60000 || _lastHeartbeatAt == 0)) {
      _lastHeartbeatAt = nowMs;
      registerNode(_enrollmentKey);
    }
    return;
  }

  // Periodic heartbeat
  if (nowMs - _lastHeartbeatAt >= MATRIX_HEARTBEAT_INTERVAL_MS) {
    sendHeartbeat();
    _lastHeartbeatAt = nowMs;
  }
}

// ============================================================
// Send heartbeat to MohnMatrix cloud
// ============================================================
void MatrixNode::sendHeartbeat() {
  if (WiFi.status() != WL_CONNECTED || !_status.registered) return;

  HTTPClient http;
  String url = String(MATRIX_API_URL) + MATRIX_HEARTBEAT_PATH;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(15000);

  // Build heartbeat payload (matches /api/nodes/heartbeat schema)
  JsonDocument doc;
  doc["nodeId"]     = _status.nodeId;
  doc["nodeSecret"] = _status.nodeSecret;

  JsonObject stats = doc["stats"].to<JsonObject>();
  stats["cpuPercent"] = 0;  // ESP32 doesn't have CPU % — always busy
  stats["memPercent"] = (int)(100 - (ESP.getFreeHeap() * 100.0 / ESP.getHeapSize()));
  stats["uptime"]     = millis() / 1000;

  JsonObject services = doc["services"].to<JsonObject>();
  services["scraper"] = "stopped";  // ESP32 doesn't run scraper
  services["tunnel"]  = WiFi.status() == WL_CONNECTED ? "running" : "stopped";

  String payload;
  serializeJson(doc, payload);

  int httpCode = http.POST(payload);
  _status.heartbeatCount++;

  if (httpCode == 200) {
    _status.lastHeartbeatOk = true;
    _status.lastHeartbeatMs = millis();

    String response = http.getString();
    JsonDocument resp;
    if (deserializeJson(resp, response) == DeserializationError::Ok) {
      // Check for pending commands
      JsonArray commands = resp["commands"].as<JsonArray>();
      for (JsonObject cmd : commands) {
        String action = cmd["action"].as<String>();
        String target = cmd["target"].as<String>();
        Serial.printf("[MatrixNode] Command: %s → %s\n", action.c_str(), target.c_str());
        // ESP32 nodes can handle: update (OTA), shutdown (deep sleep)
        if (action == "shutdown") {
          Serial.println("[MatrixNode] Shutdown command received — entering deep sleep");
          esp_deep_sleep_start();
        }
      }
    }

    if (_status.heartbeatCount % 10 == 0) {
      Serial.printf("[MatrixNode] Heartbeat #%u OK — mem: %d%%\n",
                    _status.heartbeatCount,
                    (int)(100 - (ESP.getFreeHeap() * 100.0 / ESP.getHeapSize())));
    }
  } else {
    _status.lastHeartbeatOk = false;
    Serial.printf("[MatrixNode] Heartbeat failed — HTTP %d\n", httpCode);
  }

  http.end();

  // Persist stats periodically
  if (_status.heartbeatCount % 100 == 0) {
    _matrixPrefs.begin(MATRIX_NVS_NS, false);
    _matrixPrefs.putUInt(MATRIX_NVS_POINTS, _status.pointsEarned);
    _matrixPrefs.putUInt(MATRIX_NVS_SEARCHES, _status.searchesRouted);
    _matrixPrefs.end();
  }
}

// ============================================================
// State queries
// ============================================================
bool MatrixNode::isRegistered() {
  return _status.registered;
}

MatrixNodeStatus MatrixNode::getStatus() {
  return _status;
}

void MatrixNode::setEnrollmentKey(const String& key) {
  _enrollmentKey = key;
  _matrixPrefs.begin(MATRIX_NVS_NS, false);
  _matrixPrefs.putString(MATRIX_NVS_ENROLL, key);
  _matrixPrefs.end();
  Serial.printf("[MatrixNode] Enrollment key set: %s\n", key.substring(0, 8).c_str());
}

String MatrixNode::getEnrollmentKey() {
  return _enrollmentKey;
}

void MatrixNode::clearCredentials() {
  _matrixPrefs.begin(MATRIX_NVS_NS, false);
  _matrixPrefs.clear();
  _matrixPrefs.end();
  _status = {};
  _enrollmentKey = "";
  Serial.println("[MatrixNode] Credentials cleared");
}

#endif // ENABLE_MATRIX_NODE
