/// ESP32 Node Integration — Hibernation, Supercharging, and AI Battle Arena
/// Connects MohnSters game to physical ESP32 hardware nodes
library;

import '../models/mohnster.dart';

/// Status of an ESP32 node in the MohnSters game context
enum NodeGameStatus {
  /// Node is online but no MohnSter is assigned
  idle,

  /// A MohnSter is hibernating on this node (passive XP)
  hibernating,

  /// MohnSter has been supercharged and is fighting in AI Arena
  arenaBattle,

  /// Node is offline — character digitizes
  offline,

  /// Node is provisioning (first-time setup)
  provisioning,
}

/// Represents an ESP32 node's game state
class GameNode {
  final String nodeId;
  final String ownerId;
  final String? linkedMohnsterId;
  final NodeGameStatus status;
  final DateTime? lastHeartbeat;
  final int totalXpGenerated;
  final int totalBattlesWon;
  final int totalBattlesLost;
  final bool isOnline;
  final String? wifiSsid;
  final double? signalStrength;
  final String? firmwareVersion;

  const GameNode({
    required this.nodeId,
    required this.ownerId,
    this.linkedMohnsterId,
    this.status = NodeGameStatus.idle,
    this.lastHeartbeat,
    this.totalXpGenerated = 0,
    this.totalBattlesWon = 0,
    this.totalBattlesLost = 0,
    this.isOnline = false,
    this.wifiSsid,
    this.signalStrength,
    this.firmwareVersion,
  });

  bool get hasLinkedMohnster => linkedMohnsterId != null;

  /// How long since last heartbeat
  Duration? get timeSinceLastHeartbeat =>
      lastHeartbeat != null ? DateTime.now().difference(lastHeartbeat!) : null;

  /// Node is considered disconnected if no heartbeat in 15 minutes
  bool get isDisconnected =>
      timeSinceLastHeartbeat != null &&
      timeSinceLastHeartbeat!.inMinutes > 15;

  GameNode copyWith({
    String? nodeId,
    String? ownerId,
    String? linkedMohnsterId,
    NodeGameStatus? status,
    DateTime? lastHeartbeat,
    int? totalXpGenerated,
    int? totalBattlesWon,
    int? totalBattlesLost,
    bool? isOnline,
    String? wifiSsid,
    double? signalStrength,
    String? firmwareVersion,
  }) {
    return GameNode(
      nodeId: nodeId ?? this.nodeId,
      ownerId: ownerId ?? this.ownerId,
      linkedMohnsterId: linkedMohnsterId ?? this.linkedMohnsterId,
      status: status ?? this.status,
      lastHeartbeat: lastHeartbeat ?? this.lastHeartbeat,
      totalXpGenerated: totalXpGenerated ?? this.totalXpGenerated,
      totalBattlesWon: totalBattlesWon ?? this.totalBattlesWon,
      totalBattlesLost: totalBattlesLost ?? this.totalBattlesLost,
      isOnline: isOnline ?? this.isOnline,
      wifiSsid: wifiSsid ?? this.wifiSsid,
      signalStrength: signalStrength ?? this.signalStrength,
      firmwareVersion: firmwareVersion ?? this.firmwareVersion,
    );
  }

  Map<String, dynamic> toJson() => {
        'nodeId': nodeId,
        'ownerId': ownerId,
        'linkedMohnsterId': linkedMohnsterId,
        'status': status.name,
        'lastHeartbeat': lastHeartbeat?.toIso8601String(),
        'totalXpGenerated': totalXpGenerated,
        'totalBattlesWon': totalBattlesWon,
        'totalBattlesLost': totalBattlesLost,
        'isOnline': isOnline,
        'wifiSsid': wifiSsid,
        'signalStrength': signalStrength,
        'firmwareVersion': firmwareVersion,
      };

  factory GameNode.fromJson(Map<String, dynamic> json) => GameNode(
        nodeId: json['nodeId'] as String,
        ownerId: json['ownerId'] as String,
        linkedMohnsterId: json['linkedMohnsterId'] as String?,
        status: NodeGameStatus.values
            .byName(json['status'] as String? ?? 'idle'),
        lastHeartbeat: json['lastHeartbeat'] != null
            ? DateTime.parse(json['lastHeartbeat'] as String)
            : null,
        totalXpGenerated: json['totalXpGenerated'] as int? ?? 0,
        totalBattlesWon: json['totalBattlesWon'] as int? ?? 0,
        totalBattlesLost: json['totalBattlesLost'] as int? ?? 0,
        isOnline: json['isOnline'] as bool? ?? false,
        wifiSsid: json['wifiSsid'] as String?,
        signalStrength: (json['signalStrength'] as num?)?.toDouble(),
        firmwareVersion: json['firmwareVersion'] as String?,
      );
}

/// ESP32 Supercharge Package — users pay to evolve their character
/// into a living AI fighter backed by real hardware
class SuperchargePackage {
  final String id;
  final String name;
  final String description;
  final int pointsCost;
  final double statMultiplier;
  final int bonusAbilitySlots;
  final bool requiresNodeOnline;
  final List<String> perks;

  const SuperchargePackage({
    required this.id,
    required this.name,
    required this.description,
    required this.pointsCost,
    this.statMultiplier = 1.25,
    this.bonusAbilitySlots = 1,
    this.requiresNodeOnline = true,
    this.perks = const [],
  });
}

/// Predefined supercharge tiers
class SuperchargePackages {
  static const basic = SuperchargePackage(
    id: 'supercharge_basic',
    name: 'Basic Supercharge',
    description: 'Connect your ESP32 to bring your MohnSter to life. '
        '+25% all stats while online.',
    pointsCost: 500,
    statMultiplier: 1.25,
    bonusAbilitySlots: 0,
    perks: ['25% stat boost', 'AI auto-battle', 'Passive XP generation'],
  );

  static const advanced = SuperchargePackage(
    id: 'supercharge_advanced',
    name: 'Advanced Supercharge',
    description: 'Your MohnSter becomes a permanent AI arena fighter. '
        '+50% stats, extra ability slot, learns from battles.',
    pointsCost: 2000,
    statMultiplier: 1.50,
    bonusAbilitySlots: 1,
    perks: [
      '50% stat boost',
      'AI learning from battles',
      'Extra ability slot',
      'Priority matchmaking',
      'Node uptime bonus points',
    ],
  );

  static const ultimate = SuperchargePackage(
    id: 'supercharge_ultimate',
    name: 'Ultimate Supercharge',
    description: 'Maximum evolution. Your character fights at full power '
        'with AI intelligence that adapts to opponents.',
    pointsCost: 10000,
    statMultiplier: 2.0,
    bonusAbilitySlots: 2,
    perks: [
      '100% stat boost',
      'Adaptive AI battle strategy',
      '+2 ability slots',
      'Unique visual aura effect',
      'Double XP from arena',
      'Legendary ability unlock',
      'Exclusive tournament access',
    ],
  );

  static const all = [basic, advanced, ultimate];
}

/// Manages ESP32 node integration with the game
class NodeGameService {
  /// Calculate passive XP earned while MohnSter hibernates on a node
  /// 1 XP per heartbeat (every 10 min) = 6 XP/hour = 144 XP/day
  static int calculateHibernationXp(Duration hibernationDuration) {
    final heartbeats = hibernationDuration.inMinutes ~/ 10;
    return heartbeats; // 1 XP per heartbeat
  }

  /// Calculate bonus XP for being supercharged during arena battles
  static int calculateArenaXp({
    required int battlesWon,
    required int battlesLost,
    required SuperchargePackage package,
  }) {
    final winXp = battlesWon * 30;
    final lossXp = battlesLost * 5;
    final packageMult = package.statMultiplier;
    return ((winXp + lossXp) * packageMult).round();
  }

  /// Check if a node qualifies for egg generation
  /// Nodes that have been online 24+ hours straight generate eggs
  static bool canGenerateEgg(GameNode node) {
    if (!node.isOnline) return false;
    if (node.lastHeartbeat == null) return false;
    // Node needs 24 hours of continuous uptime
    // This is tracked by consecutive heartbeats in Firestore
    return true; // Server validates actual uptime
  }

  /// When a node goes offline during an arena battle:
  /// - Character digitizes (particle scatter animation)
  /// - Opponent absorbs the orb and gets bonus points
  /// - Fighter needs to reconnect to resume
  static Map<String, dynamic> handleDisconnect(GameNode node) {
    return {
      'event': 'disconnect',
      'nodeId': node.nodeId,
      'mohnsterId': node.linkedMohnsterId,
      'animation': 'digitize_scatter', // particles scatter
      'opponentReward': 30, // bonus points for opponent
      'reconnectRequired': true,
      'timestamp': DateTime.now().toIso8601String(),
    };
  }

  /// When a node comes back online after disconnect:
  /// - Character re-materializes from orb
  /// - Stats may be slightly reduced temporarily
  /// - Must wait 5 minutes before re-entering arena
  static Map<String, dynamic> handleReconnect(GameNode node) {
    return {
      'event': 'reconnect',
      'nodeId': node.nodeId,
      'mohnsterId': node.linkedMohnsterId,
      'animation': 'rematerialize_orb', // particles coalesce back
      'cooldownMinutes': 5,
      'tempStatReduction': 0.1, // 10% stat penalty for 1 hour
      'timestamp': DateTime.now().toIso8601String(),
    };
  }
}

/// ESP32 Provisioning Steps (for the app/desktop node)
class NodeProvisioning {
  /// Step-by-step provisioning flow:
  /// 1. User opens "Supercharge Character" in app/desktop
  /// 2. Enter WiFi credentials via BLE to ESP32
  /// 3. ESP32 connects to WiFi and registers with Firebase
  /// 4. User selects which MohnSter to link
  /// 5. MohnSter enters hibernation/arena mode
  /// 6. ESP32 starts heartbeat cycle
  static const List<String> provisioningSteps = [
    'Connect to MohnNode via Bluetooth',
    'Enter WiFi network name and password',
    'Node generates secure keypair',
    'Node registers with MohnSters network',
    'Select MohnSter to link to this node',
    'Choose mode: Hibernation (passive XP) or Arena (AI battles)',
    'Activation complete! Your MohnSter is now alive on hardware.',
  ];

  /// Provisioning status updates sent from ESP32 via BLE
  static const Map<int, String> statusMessages = {
    0: 'Scanning for MohnNode...',
    1: 'Connected! Configuring WiFi...',
    2: 'WiFi connected. Generating security keys...',
    3: 'Registering with MohnSters network...',
    4: 'Ready! Select your MohnSter.',
    5: 'Linking MohnSter to node...',
    6: 'SUPERCHARGED! Your MohnSter is alive!',
  };
}
