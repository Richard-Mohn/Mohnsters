// MohnNode Configuration
// WiFi credentials, API endpoints, and game settings
#pragma once

// ============================================================
// WiFi Configuration (set via BLE provisioning or hardcode)
// ============================================================
#ifndef WIFI_SSID
#define WIFI_SSID ""
#endif
#ifndef WIFI_PASSWORD
#define WIFI_PASSWORD ""
#endif

// ============================================================
// API Configuration
// ============================================================
#ifndef API_ENDPOINT
#define API_ENDPOINT "https://us-central1-mohnsters.cloudfunctions.net"
#endif

#define API_HEARTBEAT_PATH    "/api/node/heartbeat"
#define API_REGISTER_PATH     "/api/node/register"
#define API_ARENA_TICK_PATH   "/api/node/arena-tick"
#define API_EGG_GENERATE_PATH "/api/node/generate-egg"
#define API_OTA_CHECK_PATH    "/api/node/ota-check"

// ============================================================
// Timing Configuration
// ============================================================
#ifndef HEARTBEAT_INTERVAL_MS
#define HEARTBEAT_INTERVAL_MS 600000    // 10 minutes
#endif

#ifndef ARENA_TICK_MS
#define ARENA_TICK_MS 5000              // 5 seconds between arena actions
#endif

#ifndef EGG_GENERATION_HOURS
#define EGG_GENERATION_HOURS 24         // 24 hours uptime = 1 egg
#endif

#define NTP_SYNC_INTERVAL_MS 3600000    // Re-sync NTP every hour
#define WIFI_RECONNECT_MS    30000      // Try reconnect every 30 sec
#define OTA_CHECK_INTERVAL_MS 3600000   // Check OTA every hour

// ============================================================
// Security
// ============================================================
#define KEY_NAMESPACE "mohnnode"
#define PRIVATE_KEY_NAME "priv_key"
#define PUBLIC_KEY_NAME "pub_key"
#define NODE_ID_NAME "node_id"
#define OWNER_ID_NAME "owner_id"

// ============================================================
// Game Configuration
// ============================================================
#ifndef ENABLE_GAME
#define ENABLE_GAME 1
#endif

#define GAME_NAMESPACE "mohngame"
#define LINKED_MOHNSTER_KEY "linked_id"
#define GAME_MODE_KEY "game_mode"  // "hibernation" or "arena"
#define TOTAL_XP_KEY "total_xp"
#define ARENA_WINS_KEY "arena_wins"
#define ARENA_LOSSES_KEY "arena_losses"
#define CONSECUTIVE_HEARTBEATS_KEY "consec_hb"

// Game modes
#define GAME_MODE_IDLE        0
#define GAME_MODE_HIBERNATION 1
#define GAME_MODE_ARENA       2

// ============================================================
// Hardware Configuration
// ============================================================
#ifndef ENABLE_GPS
#define ENABLE_GPS 0
#endif

#define LED_PIN 2           // Built-in LED for status indication
#define BUTTON_PIN 0        // Boot button for manual actions

// ============================================================
// Firmware Version
// ============================================================
#ifndef MOHN_FIRMWARE_VERSION
#define MOHN_FIRMWARE_VERSION "1.0.0"
#endif
