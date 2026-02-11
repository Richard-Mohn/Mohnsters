/// Evolution System — Cross-platform activity drives character evolution
/// Characters evolve through ecosystem activity, not just battles
library;

import '../models/mohnster.dart';

/// Different evolution paths a MohnSter can take
enum EvolutionPath {
  /// Standard: reach max level through battles
  standard,

  /// Activity: triggered by cross-platform Mohn Empire usage
  activity,

  /// DNA Fusion: combine two max-level MohnSters
  dnaFusion,

  /// Streak: 30/60/90 day activity streaks
  streak,

  /// Supercharge: ESP32 node-powered evolution
  supercharge,
}

/// Tracks requirements for evolution
class EvolutionRequirement {
  final String id;
  final String name;
  final String description;
  final EvolutionPath path;
  final int requiredLevel;
  final int pointsCost;
  final Map<String, int> platformRequirements; // platform -> action count
  final int streakDays;

  const EvolutionRequirement({
    required this.id,
    required this.name,
    required this.description,
    required this.path,
    this.requiredLevel = 50,
    this.pointsCost = 0,
    this.platformRequirements = const {},
    this.streakDays = 0,
  });
}

/// Evolution triggers from Mohn Empire platforms
class CrossPlatformEvolution {
  static const List<EvolutionRequirement> allRequirements = [
    // Standard evolution
    EvolutionRequirement(
      id: 'evo_standard',
      name: 'Natural Evolution',
      description: 'Reach level 50 through battles and quests.',
      path: EvolutionPath.standard,
      requiredLevel: 50,
      pointsCost: 500,
    ),

    // MohnMenu triggers
    EvolutionRequirement(
      id: 'evo_mohnmenu_weekly',
      name: 'Feast Power',
      description: 'Order \$50+ in food on MohnMenu in one week.',
      path: EvolutionPath.activity,
      requiredLevel: 20,
      platformRequirements: {'MohnMenu': 50},
    ),
    EvolutionRequirement(
      id: 'evo_mohnmenu_monthly',
      name: 'Culinary Ascension',
      description: '\$300+ monthly spend on MohnMenu unlocks rare evolution.',
      path: EvolutionPath.activity,
      requiredLevel: 30,
      platformRequirements: {'MohnMenu': 300},
    ),

    // NeighborTechs triggers
    EvolutionRequirement(
      id: 'evo_neighbortech_job',
      name: 'The Fixer',
      description: 'Complete 10+ IT repair jobs on NeighborTechs.',
      path: EvolutionPath.activity,
      requiredLevel: 15,
      platformRequirements: {'NeighborTechs': 10},
    ),
    EvolutionRequirement(
      id: 'evo_neighbortech_master',
      name: 'Master Technician',
      description: 'Complete 50+ jobs with 4.5+ star rating.',
      path: EvolutionPath.activity,
      requiredLevel: 35,
      platformRequirements: {'NeighborTechs': 50},
    ),

    // MohnServe triggers
    EvolutionRequirement(
      id: 'evo_mohnserve_serve',
      name: 'Justice Bringer',
      description: 'Complete a legal serve on MohnServe.',
      path: EvolutionPath.activity,
      requiredLevel: 10,
      platformRequirements: {'MohnServe': 1},
    ),

    // MohnPay/Node triggers
    EvolutionRequirement(
      id: 'evo_mohnpay_node',
      name: 'Grid Master',
      description: 'Run an ESP32 node and process 100+ heartbeats.',
      path: EvolutionPath.activity,
      requiredLevel: 10,
      platformRequirements: {'MohnPay': 100},
    ),

    // Flaming Social triggers
    EvolutionRequirement(
      id: 'evo_social_streak',
      name: 'Social Flame',
      description: 'Post daily for 7 days on Flaming Social.',
      path: EvolutionPath.streak,
      requiredLevel: 5,
      streakDays: 7,
    ),
    EvolutionRequirement(
      id: 'evo_social_legendary',
      name: 'Viral Legend',
      description: '30-day engagement streak on Flaming Social.',
      path: EvolutionPath.streak,
      requiredLevel: 25,
      streakDays: 30,
    ),

    // GPS/Check-in triggers
    EvolutionRequirement(
      id: 'evo_gps_30',
      name: 'Location Lock',
      description: '30 consecutive check-in days at one location.',
      path: EvolutionPath.streak,
      requiredLevel: 20,
      streakDays: 30,
    ),
    EvolutionRequirement(
      id: 'evo_gps_church',
      name: 'Faithful Guardian',
      description: 'Church attendance streak unlocks rare variant.',
      path: EvolutionPath.streak,
      requiredLevel: 15,
      streakDays: 12, // roughly 3 months of weekly attendance
    ),

    // DNA Fusion
    EvolutionRequirement(
      id: 'evo_dna_fusion',
      name: 'DNA Splice',
      description: 'Combine two max-level MohnSters into a new hybrid.',
      path: EvolutionPath.dnaFusion,
      requiredLevel: 50,
      pointsCost: 5000,
    ),

    // Supercharge evolution
    EvolutionRequirement(
      id: 'evo_supercharge',
      name: 'Hardware Awakening',
      description: 'Link to an ESP32 node and supercharge your MohnSter.',
      path: EvolutionPath.supercharge,
      requiredLevel: 10,
      pointsCost: 500,
    ),
  ];

  /// Check if a MohnSter meets evolution requirements
  static List<EvolutionRequirement> getAvailableEvolutions({
    required Mohnster mohnster,
    required Map<String, int> platformActivity,
    required int currentStreak,
  }) {
    return allRequirements.where((req) {
      // Level check
      if (mohnster.level < req.requiredLevel) return false;

      // Platform activity check
      for (final entry in req.platformRequirements.entries) {
        final userActivity = platformActivity[entry.key] ?? 0;
        if (userActivity < entry.value) return false;
      }

      // Streak check
      if (req.streakDays > 0 && currentStreak < req.streakDays) return false;

      return true;
    }).toList();
  }

  /// Apply evolution to a MohnSter
  static Mohnster evolve(Mohnster mohnster, EvolutionRequirement req) {
    final newStage = mohnster.evolutionStage + 1;
    final statBoost = 1.15 + (newStage * 0.1); // 25%, 35%, 45% per stage

    return mohnster.copyWith(
      evolutionStage: newStage,
      baseStats: MohnsterStats(
        atk: (mohnster.baseStats.atk * statBoost).round(),
        def: (mohnster.baseStats.def * statBoost).round(),
        spd: (mohnster.baseStats.spd * statBoost).round(),
        hp: (mohnster.baseStats.hp * statBoost).round(),
        sp: (mohnster.baseStats.sp * statBoost).round(),
      ),
      name: _evolvedName(mohnster.name, newStage),
      achievements: [...mohnster.achievements, req.id],
    );
  }

  static String _evolvedName(String baseName, int stage) {
    switch (stage) {
      case 1:
        return 'Evolved $baseName';
      case 2:
        return 'Mega $baseName';
      default:
        return 'Omega $baseName';
    }
  }
}

/// XP and leveling calculations
class LevelSystem {
  /// XP required for each level (exponential curve)
  static int xpForLevel(int level) {
    return (100 * (1.0 + (level - 1) * 0.2) * level).round();
  }

  /// Apply XP to a MohnSter — handles level ups
  static Mohnster addXp(Mohnster mohnster, int xpGained) {
    var xp = mohnster.xp + xpGained;
    var level = mohnster.level;
    var xpNeeded = xpForLevel(level);

    while (xp >= xpNeeded && level < 50) {
      xp -= xpNeeded;
      level++;
      xpNeeded = xpForLevel(level);
    }

    return mohnster.copyWith(
      xp: xp,
      level: level,
      xpToNextLevel: xpNeeded,
    );
  }

  /// Multiplier for various streak lengths
  static double streakMultiplier(int streakDays) {
    if (streakDays >= 90) return 3.0;
    if (streakDays >= 60) return 2.5;
    if (streakDays >= 30) return 2.0;
    if (streakDays >= 14) return 1.5;
    if (streakDays >= 7) return 1.25;
    return 1.0;
  }
}
