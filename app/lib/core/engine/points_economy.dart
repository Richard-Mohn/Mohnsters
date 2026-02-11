/// Points Economy — Earning and spending points across the ecosystem
/// Pre-token phase: points are the in-game currency
library;

/// Actions that earn points
enum EarnAction {
  cardScan,
  quickBattleWin,
  rankedBattleWin,
  tournamentFirstPlace,
  dailyLogin,
  dailyQuest,
  mohnMenuSpend,
  neighborTechsJob,
  mohnServeComplete,
  gpsStreak30,
  referFriend,
  nodeHeartbeat,
  nodeEggGenerated,
  arenaDisconnectBonus,
  hatchEgg,
  evolveCharacter,
}

/// Points earned per action
class PointsEconomy {
  static const Map<EarnAction, List<int>> earnRanges = {
    EarnAction.cardScan: [10, 100],
    EarnAction.quickBattleWin: [5, 20],
    EarnAction.rankedBattleWin: [20, 100],
    EarnAction.tournamentFirstPlace: [10000, 10000],
    EarnAction.dailyLogin: [5, 50],
    EarnAction.dailyQuest: [30, 120],
    EarnAction.mohnMenuSpend: [1, 1], // 1 point per $1
    EarnAction.neighborTechsJob: [50, 200],
    EarnAction.mohnServeComplete: [100, 100],
    EarnAction.gpsStreak30: [500, 500],
    EarnAction.referFriend: [100, 100],
    EarnAction.nodeHeartbeat: [1, 1],
    EarnAction.nodeEggGenerated: [50, 50],
    EarnAction.arenaDisconnectBonus: [30, 30],
    EarnAction.hatchEgg: [25, 100],
    EarnAction.evolveCharacter: [100, 500],
  };

  /// Calculate points for a daily login with streak multiplier
  static int dailyLoginPoints(int streakDays) {
    final base = 5;
    final streakBonus = (streakDays * 2).clamp(0, 45);
    return base + streakBonus; // Max 50 at 22+ day streak
  }

  /// Apply daily cap for node earnings (50 max per node per day)
  static int nodePointsCapped(int rawPoints, int alreadyEarnedToday) {
    const dailyCap = 50;
    final remaining = (dailyCap - alreadyEarnedToday).clamp(0, dailyCap);
    return rawPoints.clamp(0, remaining);
  }
}

/// Spend actions
enum SpendAction {
  openPack,
  levelUp,
  evolve,
  buyAbility,
  superchargePurchase,
  tournamentEntry,
  dnaFusion,
}

class PointsSpendCost {
  static const Map<SpendAction, int> costs = {
    SpendAction.openPack: 100,
    SpendAction.levelUp: 10, // per level
    SpendAction.evolve: 500,
    SpendAction.buyAbility: 200,
    SpendAction.superchargePurchase: 500, // basic tier
    SpendAction.tournamentEntry: 50,
    SpendAction.dnaFusion: 5000,
  };
}

/// User wallet / points balance tracking
class UserGameWallet {
  final String userId;
  final int pointsBalance;
  final int totalEarned;
  final int totalSpent;
  final int dailyLoginStreak;
  final DateTime? lastLoginDate;
  final Map<String, int> platformActivity; // platform -> action count

  const UserGameWallet({
    required this.userId,
    this.pointsBalance = 0,
    this.totalEarned = 0,
    this.totalSpent = 0,
    this.dailyLoginStreak = 0,
    this.lastLoginDate,
    this.platformActivity = const {},
  });

  bool canAfford(int cost) => pointsBalance >= cost;

  UserGameWallet earn(int points) => UserGameWallet(
        userId: userId,
        pointsBalance: pointsBalance + points,
        totalEarned: totalEarned + points,
        totalSpent: totalSpent,
        dailyLoginStreak: dailyLoginStreak,
        lastLoginDate: lastLoginDate,
        platformActivity: platformActivity,
      );

  UserGameWallet spend(int cost) {
    assert(canAfford(cost), 'Insufficient points');
    return UserGameWallet(
      userId: userId,
      pointsBalance: pointsBalance - cost,
      totalEarned: totalEarned,
      totalSpent: totalSpent + cost,
      dailyLoginStreak: dailyLoginStreak,
      lastLoginDate: lastLoginDate,
      platformActivity: platformActivity,
    );
  }

  UserGameWallet recordDailyLogin() {
    final today = DateTime.now();
    final isConsecutive = lastLoginDate != null &&
        today.difference(lastLoginDate!).inDays == 1;
    final newStreak = isConsecutive ? dailyLoginStreak + 1 : 1;

    return UserGameWallet(
      userId: userId,
      pointsBalance: pointsBalance,
      totalEarned: totalEarned,
      totalSpent: totalSpent,
      dailyLoginStreak: newStreak,
      lastLoginDate: today,
      platformActivity: platformActivity,
    );
  }

  Map<String, dynamic> toJson() => {
        'userId': userId,
        'pointsBalance': pointsBalance,
        'totalEarned': totalEarned,
        'totalSpent': totalSpent,
        'dailyLoginStreak': dailyLoginStreak,
        'lastLoginDate': lastLoginDate?.toIso8601String(),
        'platformActivity': platformActivity,
      };

  factory UserGameWallet.fromJson(Map<String, dynamic> json) =>
      UserGameWallet(
        userId: json['userId'] as String,
        pointsBalance: json['pointsBalance'] as int? ?? 0,
        totalEarned: json['totalEarned'] as int? ?? 0,
        totalSpent: json['totalSpent'] as int? ?? 0,
        dailyLoginStreak: json['dailyLoginStreak'] as int? ?? 0,
        lastLoginDate: json['lastLoginDate'] != null
            ? DateTime.parse(json['lastLoginDate'] as String)
            : null,
        platformActivity:
            (json['platformActivity'] as Map<String, dynamic>?)
                    ?.map((k, v) => MapEntry(k, v as int)) ??
                {},
      );
}
