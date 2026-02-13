// ================================================================
// MohnSters Unified Firmware — Main Entry Point
//
// ONE file to rule them all.
// Compiles for any aquarium tier via platformio.ini build flags.
//
// Tier 0 (Nano/Micro Pod): Heartbeat + creature logic, no display
// Tier 1 (Small Tank):     + Compact creature view + LoRa mesh
// Tier 2 (Aquarium):       + Full behavior engine, particles, FX
//
// "Every device is a container. The creature only grows
//  to the size of its aquarium."
// ================================================================

#include <Arduino.h>

// ── Core (always) ──
#include "core/aquarium.h"
#include "core/wifi_manager.h"
#include "core/heartbeat.h"
#include "core/nvs_store.h"
#include "core/identity.h"
#include "core/wallet.h"

// ── Creature (always) ──
#include "creature/creature.h"

// ── Display (conditional) ──
#if HAS_DISPLAY
  #include "display/display_hal.h"
  #include "display/creature_renderer.h"
  #include "display/screen_manager.h"
  #include "display/stats_screen.h"
  #include "display/mining_screen.h"
  #include "display/system_screen.h"
#endif

// ── Input (gesture engine + input router) ──
#include "input/gesture_engine.h"
#include "input/input_router.h"

// ── BLE (conditional — NimBLE devices only) ──
#if defined(HAS_BLE) && HAS_BLE
  #include "ble/ble_controller.h"
  #include "ble/ble_service.h"
#endif

// ── UI (display devices with menus) ──
#if HAS_DISPLAY
  #include "ui/menu_system.h"
  #include "ui/wifi_settings.h"
#endif

// ── LoRa Mesh (conditional) ──
#if HAS_LORA
  #include "lora/lora_mesh.h"
#endif

// ── MohnMatrix Node Worker (conditional) ──
#if ENABLE_MATRIX_NODE
  #include "core/matrix_node.h"
#endif

// ── GPS (conditional) ──
#if HAS_GPS
  #include <TinyGPSPlus.h>
  TinyGPSPlus gps;
  #ifndef GPS_RX_PIN
    #define GPS_RX_PIN 33
  #endif
  #ifndef GPS_TX_PIN
    #define GPS_TX_PIN 34
  #endif
  #ifndef GPS_BAUD
    #define GPS_BAUD 9600
  #endif
  HardwareSerial gpsSerial(1);
#endif

// ============================================================
// Build Flags → Defaults
// ============================================================
#ifndef FIRMWARE_VERSION
  #define FIRMWARE_VERSION "2.0.0"
#endif
#ifndef BOARD_NAME
  #define BOARD_NAME "Unknown"
#endif
#ifndef HEARTBEAT_INTERVAL_MS
  #define HEARTBEAT_INTERVAL_MS 300000
#endif
#ifndef ARENA_TICK_MS
  #define ARENA_TICK_MS 5000
#endif
#ifndef EGG_HATCH_HEARTBEATS
  #define EGG_HATCH_HEARTBEATS 144
#endif
#ifndef LED_PIN
  #define LED_PIN 2
#endif
#ifndef BUTTON_PIN
  #define BUTTON_PIN 0
#endif

// Frame timing (display devices only)
#if HAS_DISPLAY
  #define FRAME_INTERVAL_MS (1000 / DEVICE_PROFILE.targetFps)
#endif

// ============================================================
// Game Modes
// ============================================================
#define GAME_MODE_IDLE        0
#define GAME_MODE_HIBERNATION 1
#define GAME_MODE_ARENA       2

// ============================================================
// Global Objects
// ============================================================
Creature creature;

// Wallet
MohnWallet deviceWallet;

// Input system
InputRouter inputRouter;

// BLE
#if defined(HAS_BLE) && HAS_BLE
  BleController bleController;
  BleService bleService;
#endif

// UI (display devices only)
#if HAS_DISPLAY
  MenuSystem menuSystem;
  WifiSettings wifiSettings;
  bool menuOpen = false;
  int mainMenuId = -1;
  int wifiMenuId = -1;
#endif

#if defined(HAS_BLE) && HAS_BLE
bool bleControllerInitialized = false;

class FirmwareBleCallback : public BleServiceCallback {
public:
  void onCommand(uint8_t cmd, const uint8_t* data, size_t len) override {
    switch (cmd) {
      case BleCmd::SCAN_WIFI:
        #if HAS_DISPLAY
          wifiSettings.startScan();
          CreatureRenderer::showToast("WiFi scan...");
        #endif
        break;

      case BleCmd::BATTLE_START:
        creature.data.gameMode = GAME_MODE_ARENA;
        creature.saveToNVS();
        #if HAS_DISPLAY
          CreatureRenderer::showToast("Arena ON");
        #endif
        break;

      case BleCmd::BATTLE_STOP:
        creature.data.gameMode = GAME_MODE_IDLE;
        creature.saveToNVS();
        #if HAS_DISPLAY
          CreatureRenderer::showToast("Arena OFF");
        #endif
        break;

      case BleCmd::REBOOT:
        Serial.println("[BLE] Reboot command received");
        delay(250);
        ESP.restart();
        break;

      default:
        break;
    }
  }

  void onWifiCredentials(const char* ssid, const char* password) override {
    if (!ssid || strlen(ssid) == 0) return;
    Serial.printf("[BLE] WiFi credentials received for SSID: %s\n", ssid);
    WifiManager::setCredentials(ssid, password ? password : "");
    WifiManager::connect();
    #if HAS_DISPLAY
      wifiSettings.saveNetwork(ssid, password ? password : "");
      CreatureRenderer::showToast("WiFi creds saved");
    #endif
  }
};

FirmwareBleCallback firmwareBleCallback;
#endif

// ============================================================
// Global State
// ============================================================
int  consecutiveHeartbeats = 0;
bool wifiConnected = false;
int  wifiRSSI = 0;
float batteryPct = 1.0f;
float gpsLat = 0, gpsLon = 0;

// ============================================================
// Timing
// ============================================================
unsigned long lastHeartbeat = 0;
unsigned long lastFrame = 0;
unsigned long lastArenaTick = 0;
unsigned long lastLedUpdate = 0;
unsigned long lastSave = 0;
unsigned long bootTime = 0;
uint32_t frameCount = 0;

// ============================================================
// LED Patterns (for screenless devices)
// ============================================================
enum LedPattern : uint8_t {
  LED_OFF,
  LED_SLOW_PULSE,     // Idle / waiting
  LED_FAST_PULSE,     // Hibernation XP
  LED_RAPID_FLASH,    // Arena battle
  LED_SOLID,          // Connected
  LED_SOS,            // Error
  LED_HEARTBEAT_BLINK // Brief blink on heartbeat
};
LedPattern currentLedPattern = LED_OFF;

// ============================================================
// Forward Declarations
// ============================================================
void handleHeartbeat(uint32_t now);
void handleArena(uint32_t now);
void handleEggCheck(uint32_t now);
void handleInputAction(InputAction action, uint32_t now);
void updateLed(uint32_t now);
void readBattery();
void readGPS();
void autoSave(uint32_t now);

// ============================================================
//  ██████  ███████ ████████ ██    ██ ██████
// ██       ██         ██    ██    ██ ██   ██
//  ██████  █████      ██    ██    ██ ██████
//       ██ ██         ██    ██    ██ ██
//  ██████  ███████    ██     ██████  ██
// ============================================================
void setup() {
  Serial.begin(115200);
  delay(500);

  Serial.println();
  Serial.println("╔══════════════════════════════════════╗");
  Serial.println("║     MohnSters Unified Firmware       ║");
  Serial.printf( "║     v%-10s  %s\n", FIRMWARE_VERSION, "                ║");
  Serial.println("╚══════════════════════════════════════╝");

  // ── Print device profile ──
  printAquariumProfile();

  // ── Hardware Init ──
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  #ifdef BUTTON2_PIN
    pinMode(BUTTON2_PIN, INPUT_PULLUP);
  #endif

  // ── NVS ──
  NvsStore::init();

  // ── Identity ──
  Identity::init();

  // ── WiFi ──
  WifiManager::init();

  // ── API ──
  HeartbeatAPI::init();

  // ── Creature ──
  creature.init(Identity::getNodeId().c_str(), "MohnSter", ELEM_FLAME);
  creature.loadFromNVS();

  // ── Wallet ──
  deviceWallet.begin();

  // ── Input System ──
  #ifdef BUTTON2_PIN
    inputRouter.begin(BUTTON_PIN, BUTTON2_PIN);
  #else
    inputRouter.begin(BUTTON_PIN, 0xFF); // 0xFF = no second button
  #endif
  inputRouter.setMode(AppMode::NAVIGATION);

  // ── Display (init early so user sees something) ──
  #if HAS_DISPLAY
    DisplayHAL::init();
    DisplayHAL::showBootSplash(FIRMWARE_VERSION);
    delay(1500);
    CreatureRenderer::init();
    ScreenManager::init();

    // ── Menu / WiFi Settings ──
    menuSystem.begin(DisplayHAL::getTFT(), DEVICE_PROFILE);
    wifiSettings.begin(DisplayHAL::getTFT(), menuSystem, DEVICE_PROFILE);
    wifiMenuId = wifiSettings.registerMenus(menuSystem);

    // ── Register menu items ──
    static MenuItem mainMenuItems[] = {
      { "Feed",       "F", MenuItemType::ACTION,   nullptr, nullptr,
        [](MenuSystem& ms) {
          creature.feed(25);
          creature.setState(STATE_EATING, millis());
          CreatureRenderer::showToast("Yum!");
          ms.close();
          menuOpen = false;
          inputRouter.setMode(AppMode::NAVIGATION);
        }, -1 },
      { "Play",       "P", MenuItemType::ACTION,   nullptr, nullptr,
        [](MenuSystem& ms) {
          creature.play(20);
          creature.setState(STATE_HAPPY, millis());
          CreatureRenderer::showToast("Fun!");
          ms.close();
          menuOpen = false;
          inputRouter.setMode(AppMode::NAVIGATION);
        }, -1 },
      { "Rest",       "R", MenuItemType::ACTION,   nullptr, nullptr,
        [](MenuSystem& ms) {
          creature.rest(30);
          creature.setState(STATE_SLEEPING, millis());
          CreatureRenderer::showToast("Zzz...");
          ms.close();
          menuOpen = false;
          inputRouter.setMode(AppMode::NAVIGATION);
        }, -1 },
      { "",           "",  MenuItemType::SEPARATOR, nullptr, nullptr, nullptr, -1 },
      { "Arena Mode", "A", MenuItemType::ACTION,   nullptr, nullptr,
        [](MenuSystem& ms) {
          if (creature.data.gameMode == GAME_MODE_ARENA) {
            creature.data.gameMode = GAME_MODE_IDLE;
            CreatureRenderer::showToast("Arena OFF");
          } else {
            creature.data.gameMode = GAME_MODE_ARENA;
            CreatureRenderer::showToast("Arena ON!");
          }
          creature.saveToNVS();
          ms.close();
          menuOpen = false;
          inputRouter.setMode(AppMode::NAVIGATION);
        }, -1 },
      { "",           "",  MenuItemType::SEPARATOR, nullptr, nullptr, nullptr, -1 },
      { "WiFi Scan",  "W", MenuItemType::ACTION,   nullptr, nullptr,
        [](MenuSystem& ms) {
          wifiSettings.startScan();
          CreatureRenderer::showToast("Scanning...");
        }, -1 },
      { "WiFi Settings", "N", MenuItemType::SUBMENU, nullptr, nullptr,
        nullptr, -1 },
      { "BLE Pair Mode", "B", MenuItemType::ACTION, nullptr, nullptr,
        [](MenuSystem& ms) {
          #if defined(HAS_BLE) && HAS_BLE
            bleService.startAdvertising();
            CreatureRenderer::showToast("BLE pairing ON");
            Serial.printf("[PAIR] Node ID: %s\n", Identity::getNodeId().c_str());
          #endif
          ms.close();
          menuOpen = false;
          inputRouter.setMode(AppMode::NAVIGATION);
        }, -1 },
      { "BLE Gamepad", "G", MenuItemType::ACTION, nullptr, nullptr,
        [](MenuSystem& ms) {
          #if defined(HAS_BLE) && HAS_BLE
            if (!bleControllerInitialized) {
              bleController.begin();
              bleControllerInitialized = true;
            }
            bleController.startScan(10);
            CreatureRenderer::showToast("Gamepad scan...");
          #endif
          ms.close();
          menuOpen = false;
          inputRouter.setMode(AppMode::NAVIGATION);
        }, -1 },
    };
    if (wifiMenuId >= 0) {
      mainMenuItems[7].submenuId = wifiMenuId;
    }
    mainMenuId = menuSystem.addMenu("MohnSters", mainMenuItems, 10, -1);

    Serial.println("[UI] Menu system + WiFi settings ready.");
  #endif

  // ── BLE ──
  #if defined(HAS_BLE) && HAS_BLE
    bleService.begin(Identity::getNodeId().c_str());
    bleService.setCallback(&firmwareBleCallback);
    // Controller scanning deferred — will scan on user request
    // bleController.begin() and startScan() removed from boot
    // to avoid NimBLE double-init crash.
    Serial.println("[BLE] GATT service started.");
  #endif

  // ── LoRa ──
  #if HAS_LORA
    LoraMesh::init();
  #endif

  // ── GPS ──
  #if HAS_GPS
    gpsSerial.begin(GPS_BAUD, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);
    Serial.println("[GPS] Serial initialized.");
  #endif

  // ── MohnMatrix Node Worker ──
  #if ENABLE_MATRIX_NODE
    MatrixNode::init();
    Serial.println("[BOOT] MohnMatrix node worker enabled.");
  #endif

  // ── Boot time ──
  bootTime = millis();
  currentLedPattern = LED_SOLID;

  // ── Initial heartbeat ──
  handleHeartbeat(millis());

  Serial.println("\n[BOOT] ============ READY ============");
  Serial.printf("[BOOT] Node: %s\n", Identity::getNodeId().c_str());
  Serial.printf("[BOOT] Device: %s (Tier %d)\n", AQUARIUM_NAME, AQUARIUM_TIER);
  Serial.printf("[BOOT] Creature: %s Lv.%d %s\n",
                creature.data.name, creature.data.level,
                stageName(creature.data.stage));
  Serial.printf("[BOOT] Heartbeats: %lu  Total XP: %lu\n",
                (unsigned long)creature.data.heartbeats,
                (unsigned long)creature.data.totalXp);
  Serial.println("[BOOT] ===================================\n");
}

// ============================================================
// ██       ██████   ██████  ██████
// ██      ██    ██ ██    ██ ██   ██
// ██      ██    ██ ██    ██ ██████
// ██      ██    ██ ██    ██ ██
// ███████  ██████   ██████  ██
// ============================================================
void loop() {
  uint32_t now = millis();

  // ── WiFi ──
  WifiManager::update(now);
  wifiConnected = WifiManager::isConnected();
  wifiRSSI = WifiManager::getRSSI();

  // ── Heartbeat ──
  if (now - lastHeartbeat > HEARTBEAT_INTERVAL_MS) {
    handleHeartbeat(now);
  }

  // ── Arena ──
  if (creature.data.gameMode == GAME_MODE_ARENA) {
    if (now - lastArenaTick > ARENA_TICK_MS) {
      handleArena(now);
    }
  }

  // ── GPS ──
  #if HAS_GPS
    readGPS();
  #endif

  // ── MohnMatrix Heartbeat ──
  #if ENABLE_MATRIX_NODE
    MatrixNode::tick(now);
  #endif

  // ── Battery ──
  #ifdef BATTERY_ADC_PIN
    static uint32_t lastBatRead = 0;
    if (now - lastBatRead > 30000) {
      lastBatRead = now;
      readBattery();
    }
  #endif

  // ── Creature Update ──
  creature.update(now);

  // ── LoRa Mesh ──
  #if HAS_LORA
    LoraMesh::update(now);

    // Periodic beacon
    static uint32_t lastLoraBeacon = 0;
    if (now - lastLoraBeacon > 30000) {
      lastLoraBeacon = now;
      LoraMesh::sendBeacon(
        Identity::getNodeId().c_str(),
        AQUARIUM_TIER,
        (uint8_t)creature.data.stage,
        creature.data.level
      );
    }
  #endif

  // ── Display Render ──
  #if HAS_DISPLAY
    if (now - lastFrame >= FRAME_INTERVAL_MS) {
      lastFrame = now;
      frameCount++;

      // Update screen transitions
      ScreenManager::updateTransition(now);
      wifiSettings.render();

      if (menuOpen) {
        // Menu is open — render menu instead of screen
        menuSystem.render();
      } else {
        // Render current screen
        switch (ScreenManager::current()) {
          case Screen::CREATURE:
            CreatureRenderer::drawBackground(now);
            CreatureRenderer::draw(creature, now);
            CreatureRenderer::drawHUD(creature);
            CreatureRenderer::drawStatusBar(wifiConnected, wifiRSSI, batteryPct);
            break;

          case Screen::STATS:
            StatsScreen::render(creature, now);
            break;

          case Screen::MINING:
            MiningScreen::render(creature, wifiConnected, wifiRSSI,
                                 consecutiveHeartbeats, bootTime, now);
            break;

          case Screen::SYSTEM:
            SystemScreen::render(wifiConnected, wifiRSSI, batteryPct,
                                 Identity::getNodeId().c_str(), bootTime, now);
            break;
        }

        // Screen navigation dots (shown on ALL screens)
        ScreenManager::drawScreenIndicator(now);
      }

      // Push to screen
      DisplayHAL::pushFrame();
    }
  #endif

  // ── LED (screenless devices still need visual feedback) ──
  #if !HAS_DISPLAY
    updateLed(now);
  #endif

  // ── Input (InputRouter polls its own GestureEngine) ──
  inputRouter.update();

  // ── BLE Controller → Input Router ──
  #if defined(HAS_BLE) && HAS_BLE
    bleController.update(inputRouter);

    // Update BLE state notification (every 2 seconds)
    static uint32_t lastBleNotify = 0;
    if (now - lastBleNotify > 2000) {
      lastBleNotify = now;
      BleStatePacket pkt = {};
      pkt.screen = menuOpen ? 1 : 0;
      pkt.stage = (uint8_t)creature.data.stage;
      pkt.level = creature.data.level;
      pkt.hp = creature.data.combat.hp;
      pkt.maxHp = creature.data.combat.maxHp;
      pkt.hunger = creature.data.mood.hunger;
      pkt.happiness = creature.data.mood.happiness;
      pkt.energy = creature.data.mood.energy;
      pkt.element = (uint8_t)creature.data.element;
      pkt.wifiConnected = wifiConnected ? 1 : 0;
      pkt.wifiRssi = (int8_t)wifiRSSI;
      pkt.heartbeatCount = creature.data.heartbeats;
      pkt.aquariumTier = AQUARIUM_TIER;
      pkt.battleActive = (creature.data.gameMode == GAME_MODE_ARENA) ? 1 : 0;
      bleService.notifyState(pkt);
    }
  #endif

  // ── Process Input Events ──
  while (inputRouter.hasEvent()) {
    InputEvent ev = inputRouter.nextEvent();
    handleInputAction(ev.action, now);
  }

  // ── Auto-save ──
  autoSave(now);

  // ── Small delay to prevent watchdog on non-display devices ──
  #if !HAS_DISPLAY
    delay(10);
  #endif
}

// ============================================================
// Heartbeat Handler
// ============================================================
void handleHeartbeat(uint32_t now) {
  lastHeartbeat = now;
  consecutiveHeartbeats++;

  // Update creature
  creature.addHeartbeat();

  // Send to server
  HeartbeatResult result = HeartbeatAPI::sendHeartbeat(
    Identity::getNodeId(),
    Identity::getOwnerId(),
    creature.data.gameMode,
    consecutiveHeartbeats,
    gpsLat, gpsLon
  );

  if (result.success) {
    creature.addXp(result.xpEarned);

    // Handle server commands
    if (result.gameCommand.length() > 0) {
      Serial.printf("[CMD] Server command: %s\n", result.gameCommand.c_str());

      if (result.gameCommand == "evolve" && creature.shouldEvolve()) {
        creature.evolve();
        #if HAS_DISPLAY
          CreatureRenderer::showToast("EVOLVED!");
        #endif
      }
      else if (result.gameCommand == "feed") {
        creature.feed(30);
        creature.setState(STATE_EATING, now);
      }
      else if (result.gameCommand == "play") {
        creature.play(20);
        creature.setState(STATE_HAPPY, now);
      }
      else if (result.gameCommand == "arena_start") {
        creature.data.gameMode = GAME_MODE_ARENA;
        #if HAS_DISPLAY
          CreatureRenderer::showToast("Arena Mode!");
        #endif
      }
      else if (result.gameCommand == "arena_stop") {
        creature.data.gameMode = GAME_MODE_IDLE;
      }
    }

    // Blink LED briefly on success
    currentLedPattern = LED_HEARTBEAT_BLINK;

    #if HAS_DISPLAY
      char buf[32];
      snprintf(buf, sizeof(buf), "Heartbeat! +%d XP", result.xpEarned);
      CreatureRenderer::showToast(buf);
    #endif
  } else {
    consecutiveHeartbeats = 0;
    currentLedPattern = LED_SOS;
  }

  // Check for egg generation
  handleEggCheck(now);

  // Check for evolution
  if (creature.shouldEvolve() && creature.canEvolveOnThisDevice()) {
    Serial.println("[CREATURE] Ready to evolve!");
    creature.evolve();
    #if HAS_DISPLAY
      CreatureRenderer::showToast("EVOLVED!");
    #endif
  } else if (creature.shouldEvolve() && !creature.canEvolveOnThisDevice()) {
    Serial.println("[CREATURE] Would evolve, but aquarium too small!");
    Serial.println("[CREATURE] Transfer to a bigger device.");
    #if HAS_DISPLAY
      CreatureRenderer::showToast("Needs bigger aquarium!");
    #endif
  }

  // Save state
  creature.saveToNVS();
}

// ============================================================
// Arena Handler
// ============================================================
void handleArena(uint32_t now) {
  lastArenaTick = now;

  if (!wifiConnected) return;

  // Need a linked creature ID — use our creature ID for now
  ArenaResult result = HeartbeatAPI::sendArenaTick(
    Identity::getNodeId(),
    creature.data.id
  );

  if (result.success) {
    if (result.won) {
      creature.recordWin(result.xpEarned);
      creature.setState(STATE_CELEBRATING, now);
      #if HAS_DISPLAY
        char buf[32];
        snprintf(buf, sizeof(buf), "Won vs %s!", result.opponentName.c_str());
        CreatureRenderer::showToast(buf);
      #endif
    } else {
      creature.recordLoss(result.xpEarned);
      creature.takeDamage(result.damageTaken);
      creature.setState(STATE_HURT, now);
    }
  }
}

// ============================================================
// Egg Check
// ============================================================
void handleEggCheck(uint32_t now) {
  if (creature.data.heartbeats % EGG_HATCH_HEARTBEATS != 0) return;
  if (creature.data.heartbeats == 0) return;

  EggResult egg = HeartbeatAPI::sendCheckEgg(
    Identity::getNodeId(),
    creature.data.heartbeats
  );

  if (egg.success && egg.eggId.length() > 0) {
    Serial.printf("[EGG] Generated! ID: %s Type: %s\n",
                  egg.eggId.c_str(), egg.eggType.c_str());
    #if HAS_DISPLAY
      CreatureRenderer::showToast("New egg found!");
    #endif
  }
}

// ============================================================
// Input Action Handler (replaces old raw button handler)
// Routes actions from gesture engine, BLE gamepad, BLE app
// ============================================================
void handleInputAction(InputAction action, uint32_t now) {
  switch (action) {
    case InputAction::SELECT:
      #if HAS_DISPLAY
        if (menuOpen) {
          InputEvent selectEv = { InputSource::BUTTONS, InputAction::SELECT, (uint32_t)millis(), 0, 0 };
          menuSystem.handleInput(selectEv);
        } else {
          // Feed creature (only from creature screen)
          if (ScreenManager::current() == Screen::CREATURE) {
            creature.feed(15);
            creature.setState(STATE_EATING, now);
            CreatureRenderer::showToast("Feeding...");
          }
        }
      #else
        creature.feed(15);
        creature.setState(STATE_EATING, now);
      #endif
      break;

    case InputAction::BACK:
      #if HAS_DISPLAY
        if (menuOpen) {
          InputEvent backEv = { InputSource::BUTTONS, InputAction::BACK, (uint32_t)millis(), 0, 0 };
          menuSystem.handleInput(backEv);
          if (!menuSystem.isOpen()) {
            menuOpen = false;
            inputRouter.setMode(AppMode::NAVIGATION);
          }
        }
      #endif
      break;

    case InputAction::OPEN_MENU:
      #if HAS_DISPLAY
        if (!menuOpen) {
          menuOpen = true;
          menuSystem.open(mainMenuId >= 0 ? mainMenuId : 0); // Main menu
          inputRouter.setMode(AppMode::MENU);
          Serial.println("[INPUT] Menu opened");
        } else {
          menuOpen = false;
          menuSystem.close();
          inputRouter.setMode(AppMode::NAVIGATION);
          Serial.println("[INPUT] Menu closed");
        }
      #endif
      break;

    case InputAction::UP:
    case InputAction::DOWN:
    case InputAction::LEFT:
    case InputAction::RIGHT:
      #if HAS_DISPLAY
        if (menuOpen) {
          InputEvent navEv = { InputSource::BUTTONS, action, (uint32_t)millis(), 0, 0 };
          menuSystem.handleInput(navEv);
        }
      #endif
      break;

    case InputAction::QUICK_SETTINGS:
      #if HAS_DISPLAY
        if (!menuOpen) {
          if (wifiMenuId >= 0) {
            menuOpen = true;
            menuSystem.open(wifiMenuId);
            inputRouter.setMode(AppMode::MENU);
            wifiSettings.startScan();
            CreatureRenderer::showToast("WiFi/BLE settings");
            Serial.println("[INPUT] Quick → WiFi/BLE settings");
          } else {
            ScreenManager::goTo(Screen::SYSTEM);
            CreatureRenderer::showToast("System Info");
            Serial.println("[INPUT] Quick → System screen");
          }
        }
      #endif
      break;

    case InputAction::SCREEN_NEXT:
      #if HAS_DISPLAY
        if (!menuOpen) {
          ScreenManager::next();
        }
      #endif
      break;

    case InputAction::SCREEN_PREV:
      #if HAS_DISPLAY
        if (!menuOpen) {
          ScreenManager::prev();
        }
      #endif
      break;

    case InputAction::ATTACK:
      if (creature.data.gameMode == GAME_MODE_ARENA) {
        handleArena(now);
      }
      break;

    case InputAction::PAUSE:
      // Toggle game mode
      if (creature.data.gameMode == GAME_MODE_IDLE) {
        creature.data.gameMode = GAME_MODE_HIBERNATION;
        currentLedPattern = LED_FAST_PULSE;
        #if HAS_DISPLAY
          CreatureRenderer::showToast("Hibernation");
        #endif
      } else if (creature.data.gameMode == GAME_MODE_HIBERNATION) {
        creature.data.gameMode = GAME_MODE_ARENA;
        currentLedPattern = LED_RAPID_FLASH;
        #if HAS_DISPLAY
          CreatureRenderer::showToast("Arena Mode!");
        #endif
      } else {
        creature.data.gameMode = GAME_MODE_IDLE;
        currentLedPattern = LED_SLOW_PULSE;
        #if HAS_DISPLAY
          CreatureRenderer::showToast("Idle");
        #endif
      }
      creature.saveToNVS();
      break;

    case InputAction::FACTORY_RESET:
      Serial.println("[INPUT] Factory Reset triggered!");
      NvsStore::clearNamespace("mohnnode");
      NvsStore::clearNamespace("mohngame");
      NvsStore::clearNamespace("wifi");
      #if HAS_DISPLAY
        CreatureRenderer::showToast("FACTORY RESET!");
        DisplayHAL::pushFrame();
        delay(2000);
      #endif
      ESP.restart();
      break;

    default:
      break;
  }
}

// ============================================================
// LED Patterns (for screenless devices)
// ============================================================
void updateLed(uint32_t now) {
  if (now - lastLedUpdate < 50) return; // 20Hz LED update
  lastLedUpdate = now;

  switch (currentLedPattern) {
    case LED_OFF:
      digitalWrite(LED_PIN, LOW);
      break;

    case LED_SLOW_PULSE: {
      // 3-second breath
      float phase = (float)(now % 3000) / 3000.0f;
      bool on = phase < 0.15f;
      digitalWrite(LED_PIN, on ? HIGH : LOW);
      break;
    }

    case LED_FAST_PULSE: {
      // 1-second pulse
      float phase = (float)(now % 1000) / 1000.0f;
      bool on = phase < 0.3f;
      digitalWrite(LED_PIN, on ? HIGH : LOW);
      break;
    }

    case LED_RAPID_FLASH: {
      // 200ms flash
      bool on = ((now / 100) % 2) == 0;
      digitalWrite(LED_PIN, on ? HIGH : LOW);
      break;
    }

    case LED_SOLID:
      digitalWrite(LED_PIN, HIGH);
      break;

    case LED_SOS: {
      // Classic SOS pattern
      int phase = (now / 200) % 18;
      bool on = (phase < 3) || (phase >= 4 && phase < 7) ||
                (phase >= 8 && phase < 11);
      // Inner: short-short-short pause long-long-long pause short-short-short
      // Simplified:
      on = (phase < 6) ? ((phase % 2) == 0) : false;
      digitalWrite(LED_PIN, on ? HIGH : LOW);
      break;
    }

    case LED_HEARTBEAT_BLINK: {
      // Quick triple blink then back to normal
      static uint32_t blinkStart = 0;
      if (blinkStart == 0) blinkStart = now;
      uint32_t elapsed = now - blinkStart;
      if (elapsed < 600) {
        bool on = ((elapsed / 100) % 2) == 0;
        digitalWrite(LED_PIN, on ? HIGH : LOW);
      } else {
        blinkStart = 0;
        currentLedPattern = wifiConnected ? LED_SLOW_PULSE : LED_SOS;
      }
      break;
    }
  }
}

// ============================================================
// Battery Reading
// ============================================================
void readBattery() {
  #ifdef BATTERY_ADC_PIN
    #ifdef BATTERY_ADC_CTRL
      pinMode(BATTERY_ADC_CTRL, OUTPUT);
      digitalWrite(BATTERY_ADC_CTRL, LOW); // Enable ADC
      delay(10);
    #endif

    int raw = analogRead(BATTERY_ADC_PIN);
    float voltage = (raw / 4095.0f) * 3.3f * 2.0f; // Voltage divider
    batteryPct = constrain((voltage - 3.2f) / (4.2f - 3.2f), 0.0f, 1.0f);

    #ifdef BATTERY_ADC_CTRL
      digitalWrite(BATTERY_ADC_CTRL, HIGH); // Disable ADC
    #endif
  #endif
}

// ============================================================
// GPS Reading
// ============================================================
void readGPS() {
  #if HAS_GPS
    while (gpsSerial.available()) {
      gps.encode(gpsSerial.read());
    }
    if (gps.location.isValid()) {
      gpsLat = gps.location.lat();
      gpsLon = gps.location.lng();
    }
  #endif
}

// ============================================================
// Auto-save (every 5 minutes)
// ============================================================
void autoSave(uint32_t now) {
  if (now - lastSave < 300000) return;
  lastSave = now;
  creature.saveToNVS();
  Serial.println("[SAVE] Auto-saved creature state.");
}
