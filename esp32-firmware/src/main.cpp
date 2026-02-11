// ================================================================
// MohnNode ESP32 Firmware — Main Entry Point
// Supports: Heartbeat, Hibernation XP, Supercharge Arena, Egg Gen
// ================================================================

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Preferences.h>
#include "config.h"

#if ENABLE_GPS
#include <TinyGPSPlus.h>
TinyGPSPlus gps;
HardwareSerial gpsSerial(1);
#endif

// ============================================================
// Global State
// ============================================================
Preferences prefs;
String nodeId = "";
String ownerId = "";
String linkedMohnsterId = "";
int gameMode = GAME_MODE_IDLE;
int consecutiveHeartbeats = 0;
int totalXp = 0;
int arenaWins = 0;
int arenaLosses = 0;
bool isRegistered = false;

unsigned long lastHeartbeat = 0;
unsigned long lastArenaTick = 0;
unsigned long lastNtpSync = 0;
unsigned long lastOtaCheck = 0;
unsigned long bootTime = 0;

// LED patterns for visual status
enum LedPattern {
  LED_OFF,
  LED_SLOW_PULSE,    // Idle — waiting
  LED_FAST_PULSE,    // Hibernation — earning XP
  LED_RAPID_FLASH,   // Arena — fighting
  LED_SOLID,         // Connected, active
  LED_SOS,           // Error state
};
LedPattern currentLedPattern = LED_OFF;

// ============================================================
// Forward Declarations
// ============================================================
void connectWifi();
void loadNodeState();
void saveNodeState();
void sendHeartbeat();
void runArenaTick();
void checkEggGeneration();
void updateLed();
String getSystemPayload();
String signPayload(const String& payload);

// ============================================================
// Setup
// ============================================================
void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println("\n========================================");
  Serial.println("  MohnNode ESP32 Firmware v" MOHN_FIRMWARE_VERSION);
  Serial.println("  MohnSters Game Integration: " +
                 String(ENABLE_GAME ? "ENABLED" : "DISABLED"));
  Serial.println("========================================\n");

  // Initialize LED
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  // Load saved state from NVS
  loadNodeState();

  // Connect to WiFi
  connectWifi();

  // Record boot time
  bootTime = millis();

  // Initial heartbeat
  sendHeartbeat();

  Serial.println("[BOOT] MohnNode ready!");
  Serial.println("[BOOT] Node ID: " + nodeId);
  Serial.println("[BOOT] Owner: " + ownerId);
  Serial.println("[BOOT] Game Mode: " + String(gameMode));
  Serial.println("[BOOT] Linked MohnSter: " + linkedMohnsterId);
  Serial.println("[BOOT] Total XP Generated: " + String(totalXp));
}

// ============================================================
// Main Loop
// ============================================================
void loop() {
  unsigned long now = millis();

  // Ensure WiFi stays connected
  if (WiFi.status() != WL_CONNECTED) {
    currentLedPattern = LED_SOS;
    connectWifi();
  }

  // Heartbeat cycle (every 10 minutes)
  if (now - lastHeartbeat >= HEARTBEAT_INTERVAL_MS) {
    sendHeartbeat();
    lastHeartbeat = now;
  }

  // Arena battle tick (every 5 seconds, only in arena mode)
  if (ENABLE_GAME && gameMode == GAME_MODE_ARENA) {
    if (now - lastArenaTick >= ARENA_TICK_MS) {
      runArenaTick();
      lastArenaTick = now;
    }
    currentLedPattern = LED_RAPID_FLASH;
  } else if (ENABLE_GAME && gameMode == GAME_MODE_HIBERNATION) {
    currentLedPattern = LED_FAST_PULSE;
  } else {
    currentLedPattern = LED_SLOW_PULSE;
  }

  // Check egg generation (every hour)
  if (ENABLE_GAME && now - bootTime > 3600000) {
    checkEggGeneration();
  }

  // Update LED animation
  updateLed();

  // Check for button press (manual actions)
  if (digitalRead(BUTTON_PIN) == LOW) {
    delay(200); // debounce
    if (digitalRead(BUTTON_PIN) == LOW) {
      Serial.println("[BTN] Manual heartbeat triggered");
      sendHeartbeat();
    }
  }

  delay(100);
}

// ============================================================
// WiFi Connection
// ============================================================
void connectWifi() {
  if (WiFi.status() == WL_CONNECTED) return;

  // Read WiFi creds from NVS (set during provisioning)
  prefs.begin("wifi", true);
  String ssid = prefs.getString("ssid", WIFI_SSID);
  String pass = prefs.getString("pass", WIFI_PASSWORD);
  prefs.end();

  if (ssid.length() == 0) {
    Serial.println("[WIFI] No WiFi credentials. Waiting for BLE provisioning...");
    currentLedPattern = LED_SOS;
    return;
  }

  Serial.print("[WIFI] Connecting to: ");
  Serial.println(ssid);

  WiFi.begin(ssid.c_str(), pass.c_str());

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[WIFI] Connected! IP: " + WiFi.localIP().toString());
    Serial.println("[WIFI] RSSI: " + String(WiFi.RSSI()));
    currentLedPattern = LED_SOLID;
  } else {
    Serial.println("\n[WIFI] Connection failed. Will retry...");
    currentLedPattern = LED_SOS;
  }
}

// ============================================================
// Node State Management (NVS Flash)
// ============================================================
void loadNodeState() {
  // Load node identity
  prefs.begin(KEY_NAMESPACE, true);
  nodeId = prefs.getString(NODE_ID_NAME, "");
  ownerId = prefs.getString(OWNER_ID_NAME, "");
  isRegistered = nodeId.length() > 0;
  prefs.end();

  // Load game state
  if (ENABLE_GAME) {
    prefs.begin(GAME_NAMESPACE, true);
    linkedMohnsterId = prefs.getString(LINKED_MOHNSTER_KEY, "");
    gameMode = prefs.getInt(GAME_MODE_KEY, GAME_MODE_IDLE);
    totalXp = prefs.getInt(TOTAL_XP_KEY, 0);
    arenaWins = prefs.getInt(ARENA_WINS_KEY, 0);
    arenaLosses = prefs.getInt(ARENA_LOSSES_KEY, 0);
    consecutiveHeartbeats = prefs.getInt(CONSECUTIVE_HEARTBEATS_KEY, 0);
    prefs.end();
  }

  if (!isRegistered) {
    // Generate a node ID on first boot
    nodeId = "mohn_" + String((uint32_t)ESP.getEfuseMac(), HEX);
    prefs.begin(KEY_NAMESPACE, false);
    prefs.putString(NODE_ID_NAME, nodeId);
    prefs.end();
    Serial.println("[INIT] Generated Node ID: " + nodeId);
  }
}

void saveNodeState() {
  if (ENABLE_GAME) {
    prefs.begin(GAME_NAMESPACE, false);
    prefs.putString(LINKED_MOHNSTER_KEY, linkedMohnsterId);
    prefs.putInt(GAME_MODE_KEY, gameMode);
    prefs.putInt(TOTAL_XP_KEY, totalXp);
    prefs.putInt(ARENA_WINS_KEY, arenaWins);
    prefs.putInt(ARENA_LOSSES_KEY, arenaLosses);
    prefs.putInt(CONSECUTIVE_HEARTBEATS_KEY, consecutiveHeartbeats);
    prefs.end();
  }
}

// ============================================================
// Heartbeat — 10 minute cycle
// ============================================================
void sendHeartbeat() {
  if (WiFi.status() != WL_CONNECTED) return;

  consecutiveHeartbeats++;

  // Build payload
  JsonDocument doc;
  doc["nodeId"] = nodeId;
  doc["ownerId"] = ownerId;
  doc["timestamp"] = millis();
  doc["firmwareVersion"] = MOHN_FIRMWARE_VERSION;

  // System data
  JsonObject sys = doc["system"].to<JsonObject>();
  sys["rssi"] = WiFi.RSSI();
  sys["heap"] = ESP.getFreeHeap();
  sys["uptime"] = millis() / 1000;
  sys["temp"] = temperatureRead();

  // Game state
  if (ENABLE_GAME) {
    JsonObject game = doc["game"].to<JsonObject>();
    game["linkedMohnsterId"] = linkedMohnsterId;
    game["gameMode"] = gameMode;
    game["consecutiveHeartbeats"] = consecutiveHeartbeats;
    game["totalXp"] = totalXp;
    game["arenaWins"] = arenaWins;
    game["arenaLosses"] = arenaLosses;

    // Hibernation: earn 1 XP per heartbeat
    if (gameMode == GAME_MODE_HIBERNATION && linkedMohnsterId.length() > 0) {
      totalXp++;
      Serial.println("[GAME] Hibernation XP +1 (Total: " + String(totalXp) + ")");
    }
  }

#if ENABLE_GPS
  if (gps.location.isValid()) {
    JsonObject loc = doc["gps"].to<JsonObject>();
    loc["lat"] = gps.location.lat();
    loc["lng"] = gps.location.lng();
    loc["satellites"] = gps.satellites.value();
  }
#endif

  // Serialize
  String payload;
  serializeJson(doc, payload);

  // POST to Firebase
  HTTPClient http;
  String url = String(API_ENDPOINT) + API_HEARTBEAT_PATH;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(payload);

  if (httpCode == 200) {
    String response = http.getString();
    Serial.println("[HB] Heartbeat sent. Response: " + response);

    // Parse server response for game commands
    JsonDocument resp;
    deserializeJson(resp, response);

    if (ENABLE_GAME && resp.containsKey("gameCommand")) {
      String cmd = resp["gameCommand"].as<String>();
      handleGameCommand(cmd, resp);
    }
  } else {
    Serial.println("[HB] Heartbeat failed. HTTP: " + String(httpCode));
  }

  http.end();
  saveNodeState();
}

// ============================================================
// Game Commands from Server
// ============================================================
void handleGameCommand(const String& cmd, JsonDocument& data) {
  Serial.println("[GAME] Command received: " + cmd);

  if (cmd == "set_mode") {
    gameMode = data["mode"].as<int>();
    Serial.println("[GAME] Mode changed to: " + String(gameMode));
  } else if (cmd == "link_mohnster") {
    linkedMohnsterId = data["mohnsterId"].as<String>();
    Serial.println("[GAME] Linked MohnSter: " + linkedMohnsterId);
  } else if (cmd == "unlink_mohnster") {
    linkedMohnsterId = "";
    gameMode = GAME_MODE_IDLE;
    Serial.println("[GAME] MohnSter unlinked");
  } else if (cmd == "arena_result") {
    bool won = data["won"].as<bool>();
    if (won) {
      arenaWins++;
      totalXp += 30;
      Serial.println("[GAME] Arena WIN! +30 XP");
    } else {
      arenaLosses++;
      totalXp += 5;
      Serial.println("[GAME] Arena loss. +5 XP");
    }
  } else if (cmd == "supercharge") {
    // Supercharge activation
    Serial.println("[GAME] SUPERCHARGE ACTIVATED!");
    gameMode = GAME_MODE_ARENA;
  }

  saveNodeState();
}

// ============================================================
// Arena Battle Tick — AI fighting (every 5 seconds)
// ============================================================
void runArenaTick() {
  if (WiFi.status() != WL_CONNECTED) {
    // DISCONNECT! Character digitizes!
    Serial.println("[ARENA] CONNECTION LOST! Character digitizing...");
    gameMode = GAME_MODE_IDLE;
    saveNodeState();
    return;
  }

  if (linkedMohnsterId.length() == 0) return;

  // Send arena tick to server
  JsonDocument doc;
  doc["nodeId"] = nodeId;
  doc["ownerId"] = ownerId;
  doc["mohnsterId"] = linkedMohnsterId;
  doc["action"] = "arena_tick";
  doc["rssi"] = WiFi.RSSI();
  doc["heap"] = ESP.getFreeHeap();

  String payload;
  serializeJson(doc, payload);

  HTTPClient http;
  String url = String(API_ENDPOINT) + API_ARENA_TICK_PATH;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(payload);

  if (httpCode == 200) {
    String response = http.getString();
    JsonDocument resp;
    deserializeJson(resp, response);

    // Process battle result
    if (resp.containsKey("battleEvent")) {
      String event = resp["battleEvent"].as<String>();
      int damage = resp["damage"] | 0;
      String desc = resp["description"] | "";
      Serial.println("[ARENA] " + desc);

      if (event == "win") {
        arenaWins++;
        totalXp += 30;
      } else if (event == "loss") {
        arenaLosses++;
        totalXp += 5;
      } else if (event == "hit") {
        Serial.println("[ARENA] Hit dealt: " + String(damage) + " damage");
      }
    }
  } else {
    Serial.println("[ARENA] Tick failed. HTTP: " + String(httpCode));
  }

  http.end();
}

// ============================================================
// Egg Generation — 24h continuous uptime = 1 egg
// ============================================================
void checkEggGeneration() {
  // Need 144 consecutive heartbeats (24 hours at 10 min intervals)
  if (consecutiveHeartbeats < 144) return;

  Serial.println("[EGG] 24h uptime reached! Generating egg...");

  JsonDocument doc;
  doc["nodeId"] = nodeId;
  doc["ownerId"] = ownerId;
  doc["consecutiveHeartbeats"] = consecutiveHeartbeats;
  doc["action"] = "generate_egg";

  String payload;
  serializeJson(doc, payload);

  HTTPClient http;
  String url = String(API_ENDPOINT) + API_EGG_GENERATE_PATH;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(payload);

  if (httpCode == 200) {
    consecutiveHeartbeats = 0; // Reset counter
    Serial.println("[EGG] Egg generated! Counter reset.");
  } else {
    Serial.println("[EGG] Egg generation failed. HTTP: " + String(httpCode));
  }

  http.end();
  saveNodeState();
}

// ============================================================
// LED Status Animation
// ============================================================
void updateLed() {
  unsigned long now = millis();

  switch (currentLedPattern) {
    case LED_OFF:
      digitalWrite(LED_PIN, LOW);
      break;
    case LED_SOLID:
      digitalWrite(LED_PIN, HIGH);
      break;
    case LED_SLOW_PULSE:
      digitalWrite(LED_PIN, (now / 2000) % 2 ? HIGH : LOW);
      break;
    case LED_FAST_PULSE:
      digitalWrite(LED_PIN, (now / 500) % 2 ? HIGH : LOW);
      break;
    case LED_RAPID_FLASH:
      digitalWrite(LED_PIN, (now / 150) % 2 ? HIGH : LOW);
      break;
    case LED_SOS:
      // SOS pattern
      {
        int phase = (now / 200) % 18;
        bool on = (phase < 3) || (phase >= 4 && phase < 7) ||
                  (phase >= 8 && phase < 11);
        digitalWrite(LED_PIN, on ? HIGH : LOW);
      }
      break;
  }
}
