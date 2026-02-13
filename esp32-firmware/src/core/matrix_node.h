// ================================================================
// MohnMatrix Node Worker — ESP32 ↔ MohnMatrix Cloud Bridge
//
// Registers this ESP32 device as a MohnMatrix network node.
// While the MohnSters game runs (proof-of-service), the device
// also heartbeats to MohnMatrix cloud scraper infrastructure,
// contributing its residential WiFi IP for GDC civil court
// searches and earning MOHN points.
//
// Architecture:
//   ESP32 (WiFi) → MohnMatrix Cloud Run (primary scraper)
//   The cloud service can route GDC search requests through
//   registered residential node IPs when proxy KYC is unavailable.
//
// This module is OPTIONAL — enable via ENABLE_MATRIX_NODE=1
// ================================================================
#pragma once

#include <Arduino.h>

// ============================================================
// Matrix Node Configuration (from platformio.ini build flags)
// ============================================================
#ifndef MATRIX_API_URL
  #define MATRIX_API_URL "https://mohnmatrix.com"
#endif
#ifndef MATRIX_HEARTBEAT_INTERVAL_MS
  #define MATRIX_HEARTBEAT_INTERVAL_MS 30000  // 30 seconds (matches PC agent)
#endif
#ifndef MATRIX_REGISTER_PATH
  #define MATRIX_REGISTER_PATH "/api/nodes/register"
#endif
#ifndef MATRIX_HEARTBEAT_PATH
  #define MATRIX_HEARTBEAT_PATH "/api/nodes/heartbeat"
#endif
#ifndef ENABLE_MATRIX_NODE
  #define ENABLE_MATRIX_NODE 0
#endif

// ============================================================
// Matrix Node Status
// ============================================================
struct MatrixNodeStatus {
  bool     registered;
  bool     lastHeartbeatOk;
  uint32_t heartbeatCount;
  uint32_t pointsEarned;
  uint32_t searchesRouted;
  String   nodeId;
  String   nodeSecret;
  unsigned long lastHeartbeatMs;
};

// ============================================================
// Matrix Node API
// ============================================================
namespace MatrixNode {

  // Initialize — load saved credentials from NVS
  void init();

  // Register with MohnMatrix cloud using enrollment key
  // enrollmentKey can be set via BLE provisioning or hardcoded
  bool registerNode(const String& enrollmentKey);

  // Send heartbeat to MohnMatrix (called from main loop)
  void tick(unsigned long nowMs);

  // Force an immediate heartbeat
  void sendHeartbeat();

  // State queries
  bool isRegistered();
  MatrixNodeStatus getStatus();

  // Enrollment key management (set via BLE or serial)
  void setEnrollmentKey(const String& key);
  String getEnrollmentKey();

  // Clear stored credentials (factory reset)
  void clearCredentials();
}
