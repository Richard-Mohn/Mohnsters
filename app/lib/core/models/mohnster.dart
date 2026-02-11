/// MohnSter — Core creature model for the game
/// Generated from card scans, evolved through ecosystem activity
library;

enum Element { flame, aqua, nature, thunder, shadow, crystal }

enum Rarity { common, uncommon, rare, epic, legendary, mythic }

enum MohnsterState {
  /// Dormant egg waiting to hatch
  egg,

  /// Actively alive and usable
  active,

  /// Hibernating on an ESP32 node (earns passive XP)
  hibernating,

  /// Currently in a battle
  battling,

  /// Knocked out — needs revival
  fainted,

  /// Digitized / disconnected during battle
  digitized,
}

class MohnsterStats {
  final int atk;
  final int def;
  final int spd;
  final int hp;
  final int sp; // Special ability power

  const MohnsterStats({
    required this.atk,
    required this.def,
    required this.spd,
    required this.hp,
    required this.sp,
  });

  int get total => atk + def + spd + hp + sp;

  MohnsterStats copyWith({int? atk, int? def, int? spd, int? hp, int? sp}) {
    return MohnsterStats(
      atk: atk ?? this.atk,
      def: def ?? this.def,
      spd: spd ?? this.spd,
      hp: hp ?? this.hp,
      sp: sp ?? this.sp,
    );
  }

  Map<String, dynamic> toJson() => {
        'atk': atk,
        'def': def,
        'spd': spd,
        'hp': hp,
        'sp': sp,
      };

  factory MohnsterStats.fromJson(Map<String, dynamic> json) => MohnsterStats(
        atk: json['atk'] as int,
        def: json['def'] as int,
        spd: json['spd'] as int,
        hp: json['hp'] as int,
        sp: json['sp'] as int,
      );

  /// Generate base stats for a given rarity tier
  factory MohnsterStats.forRarity(Rarity rarity, {int? seed}) {
    final r = seed != null
        ? _SeededRandom(seed)
        : _SeededRandom(DateTime.now().microsecondsSinceEpoch);
    final range = _statRanges[rarity]!;
    return MohnsterStats(
      atk: r.nextInRange(range[0], range[1]),
      def: r.nextInRange(range[0], range[1]),
      spd: r.nextInRange(range[0], range[1]),
      hp: r.nextInRange(range[0], range[1]),
      sp: r.nextInRange(range[0], range[1]),
    );
  }

  static const Map<Rarity, List<int>> _statRanges = {
    Rarity.common: [40, 60],
    Rarity.uncommon: [55, 75],
    Rarity.rare: [70, 90],
    Rarity.epic: [85, 105],
    Rarity.legendary: [100, 120],
    Rarity.mythic: [115, 140],
  };
}

class _SeededRandom {
  int _seed;
  _SeededRandom(this._seed);
  int nextInRange(int min, int max) {
    _seed = (_seed * 1103515245 + 12345) & 0x7fffffff;
    return min + (_seed % (max - min + 1));
  }
}

class MohnsterAbility {
  final String id;
  final String name;
  final String description;
  final Element element;
  final int power;
  final int cost; // SP cost
  final double accuracy; // 0.0 - 1.0

  const MohnsterAbility({
    required this.id,
    required this.name,
    required this.description,
    required this.element,
    required this.power,
    required this.cost,
    this.accuracy = 0.95,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'description': description,
        'element': element.name,
        'power': power,
        'cost': cost,
        'accuracy': accuracy,
      };

  factory MohnsterAbility.fromJson(Map<String, dynamic> json) =>
      MohnsterAbility(
        id: json['id'] as String,
        name: json['name'] as String,
        description: json['description'] as String,
        element: Element.values.byName(json['element'] as String),
        power: json['power'] as int,
        cost: json['cost'] as int,
        accuracy: (json['accuracy'] as num).toDouble(),
      );
}

class Mohnster {
  final String id;
  final String name;
  final String? sourceCardFingerprint;
  final String ownerId;
  final Element element;
  final Rarity rarity;
  final MohnsterState state;
  final MohnsterStats baseStats;
  final int level;
  final int xp;
  final int xpToNextLevel;
  final int evolutionStage; // 0 = base, 1 = evolved, 2 = mega
  final List<MohnsterAbility> abilities;
  final List<String> achievements;
  final String? imageUrl;
  final String? model3dUrl;
  final DateTime createdAt;
  final DateTime? lastBattleAt;

  // ESP32 / Node integration
  final String? linkedNodeId;
  final bool isSupercharged;
  final DateTime? hibernationStartedAt;

  // Egg system
  final DateTime? eggCreatedAt;
  final int eggHatchProgress; // 0-100
  final String? eggType; // determines what hatches

  // Battle record
  final int wins;
  final int losses;
  final int currentHp;

  const Mohnster({
    required this.id,
    required this.name,
    this.sourceCardFingerprint,
    required this.ownerId,
    required this.element,
    required this.rarity,
    this.state = MohnsterState.egg,
    required this.baseStats,
    this.level = 1,
    this.xp = 0,
    this.xpToNextLevel = 100,
    this.evolutionStage = 0,
    this.abilities = const [],
    this.achievements = const [],
    this.imageUrl,
    this.model3dUrl,
    required this.createdAt,
    this.lastBattleAt,
    this.linkedNodeId,
    this.isSupercharged = false,
    this.hibernationStartedAt,
    this.eggCreatedAt,
    this.eggHatchProgress = 0,
    this.eggType,
    this.wins = 0,
    this.losses = 0,
    int? currentHp,
  }) : currentHp = currentHp ?? baseStats.hp;

  /// Effective stats after level scaling + supercharge bonus
  MohnsterStats get effectiveStats {
    final levelMultiplier = 1.0 + (level - 1) * 0.05;
    final superchargeBonus = isSupercharged ? 1.25 : 1.0;
    final mult = levelMultiplier * superchargeBonus;
    return MohnsterStats(
      atk: (baseStats.atk * mult).round(),
      def: (baseStats.def * mult).round(),
      spd: (baseStats.spd * mult).round(),
      hp: (baseStats.hp * mult).round(),
      sp: (baseStats.sp * mult).round(),
    );
  }

  bool get isAlive => currentHp > 0;
  bool get canBattle =>
      state == MohnsterState.active && isAlive && !isSupercharged;
  bool get isEgg => state == MohnsterState.egg;
  bool get isHibernating => state == MohnsterState.hibernating;

  Mohnster copyWith({
    String? id,
    String? name,
    String? sourceCardFingerprint,
    String? ownerId,
    Element? element,
    Rarity? rarity,
    MohnsterState? state,
    MohnsterStats? baseStats,
    int? level,
    int? xp,
    int? xpToNextLevel,
    int? evolutionStage,
    List<MohnsterAbility>? abilities,
    List<String>? achievements,
    String? imageUrl,
    String? model3dUrl,
    DateTime? createdAt,
    DateTime? lastBattleAt,
    String? linkedNodeId,
    bool? isSupercharged,
    DateTime? hibernationStartedAt,
    DateTime? eggCreatedAt,
    int? eggHatchProgress,
    String? eggType,
    int? wins,
    int? losses,
    int? currentHp,
  }) {
    return Mohnster(
      id: id ?? this.id,
      name: name ?? this.name,
      sourceCardFingerprint:
          sourceCardFingerprint ?? this.sourceCardFingerprint,
      ownerId: ownerId ?? this.ownerId,
      element: element ?? this.element,
      rarity: rarity ?? this.rarity,
      state: state ?? this.state,
      baseStats: baseStats ?? this.baseStats,
      level: level ?? this.level,
      xp: xp ?? this.xp,
      xpToNextLevel: xpToNextLevel ?? this.xpToNextLevel,
      evolutionStage: evolutionStage ?? this.evolutionStage,
      abilities: abilities ?? this.abilities,
      achievements: achievements ?? this.achievements,
      imageUrl: imageUrl ?? this.imageUrl,
      model3dUrl: model3dUrl ?? this.model3dUrl,
      createdAt: createdAt ?? this.createdAt,
      lastBattleAt: lastBattleAt ?? this.lastBattleAt,
      linkedNodeId: linkedNodeId ?? this.linkedNodeId,
      isSupercharged: isSupercharged ?? this.isSupercharged,
      hibernationStartedAt:
          hibernationStartedAt ?? this.hibernationStartedAt,
      eggCreatedAt: eggCreatedAt ?? this.eggCreatedAt,
      eggHatchProgress: eggHatchProgress ?? this.eggHatchProgress,
      eggType: eggType ?? this.eggType,
      wins: wins ?? this.wins,
      losses: losses ?? this.losses,
      currentHp: currentHp ?? this.currentHp,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'sourceCardFingerprint': sourceCardFingerprint,
        'ownerId': ownerId,
        'element': element.name,
        'rarity': rarity.name,
        'state': state.name,
        'baseStats': baseStats.toJson(),
        'level': level,
        'xp': xp,
        'xpToNextLevel': xpToNextLevel,
        'evolutionStage': evolutionStage,
        'abilities': abilities.map((a) => a.toJson()).toList(),
        'achievements': achievements,
        'imageUrl': imageUrl,
        'model3dUrl': model3dUrl,
        'createdAt': createdAt.toIso8601String(),
        'lastBattleAt': lastBattleAt?.toIso8601String(),
        'linkedNodeId': linkedNodeId,
        'isSupercharged': isSupercharged,
        'hibernationStartedAt': hibernationStartedAt?.toIso8601String(),
        'eggCreatedAt': eggCreatedAt?.toIso8601String(),
        'eggHatchProgress': eggHatchProgress,
        'eggType': eggType,
        'wins': wins,
        'losses': losses,
        'currentHp': currentHp,
      };

  factory Mohnster.fromJson(Map<String, dynamic> json) => Mohnster(
        id: json['id'] as String,
        name: json['name'] as String,
        sourceCardFingerprint: json['sourceCardFingerprint'] as String?,
        ownerId: json['ownerId'] as String,
        element: Element.values.byName(json['element'] as String),
        rarity: Rarity.values.byName(json['rarity'] as String),
        state: MohnsterState.values.byName(json['state'] as String),
        baseStats:
            MohnsterStats.fromJson(json['baseStats'] as Map<String, dynamic>),
        level: json['level'] as int,
        xp: json['xp'] as int,
        xpToNextLevel: json['xpToNextLevel'] as int,
        evolutionStage: json['evolutionStage'] as int,
        abilities: (json['abilities'] as List<dynamic>)
            .map((a) =>
                MohnsterAbility.fromJson(a as Map<String, dynamic>))
            .toList(),
        achievements:
            (json['achievements'] as List<dynamic>).cast<String>(),
        imageUrl: json['imageUrl'] as String?,
        model3dUrl: json['model3dUrl'] as String?,
        createdAt: DateTime.parse(json['createdAt'] as String),
        lastBattleAt: json['lastBattleAt'] != null
            ? DateTime.parse(json['lastBattleAt'] as String)
            : null,
        linkedNodeId: json['linkedNodeId'] as String?,
        isSupercharged: json['isSupercharged'] as bool? ?? false,
        hibernationStartedAt: json['hibernationStartedAt'] != null
            ? DateTime.parse(json['hibernationStartedAt'] as String)
            : null,
        eggCreatedAt: json['eggCreatedAt'] != null
            ? DateTime.parse(json['eggCreatedAt'] as String)
            : null,
        eggHatchProgress: json['eggHatchProgress'] as int? ?? 0,
        eggType: json['eggType'] as String?,
        wins: json['wins'] as int? ?? 0,
        losses: json['losses'] as int? ?? 0,
        currentHp: json['currentHp'] as int?,
      );
}
