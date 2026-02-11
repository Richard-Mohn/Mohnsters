/// Card Abstraction Layer — Strips all IP from scanned cards
/// Converts copyrighted card data into generic game attributes
library;

import '../models/mohnster.dart';

/// Raw card data extracted from OCR/AI scan
class RawCardData {
  final String? detectedName; // Will be STRIPPED — never used in game
  final String? detectedType; // "Fire", "Water" etc → mapped to generic
  final int? detectedHp;
  final String? detectedRarity;
  final List<String> dominantColors; // hex codes
  final String? bodyType; // "winged", "quadruped" etc from CV
  final String? franchise; // "Pokemon", "MTG" etc — STRIPPED
  final String? cardSet;
  final String? cardNumber;

  const RawCardData({
    this.detectedName,
    this.detectedType,
    this.detectedHp,
    this.detectedRarity,
    this.dominantColors = const [],
    this.bodyType,
    this.franchise,
    this.cardSet,
    this.cardNumber,
  });
}

/// Sanitized, generic attributes safe for AI generation
class AbstractedCardData {
  final int powerLevel; // 1-20 scale
  final Element element;
  final Rarity rarity;
  final String bodyDescriptor; // "winged-humanoid", "aquatic-serpent" etc
  final List<String> colorPalette;
  final String stance; // "aggressive", "defensive", "neutral"
  final String cardFingerprint; // unique hash for dedup

  const AbstractedCardData({
    required this.powerLevel,
    required this.element,
    required this.rarity,
    required this.bodyDescriptor,
    required this.colorPalette,
    required this.stance,
    required this.cardFingerprint,
  });

  /// Generate AI prompt for creature image generation
  /// CRITICAL: No copyrighted terms ever enter this prompt
  String toAiPrompt() {
    return 'A fantasy creature for a trading card game, '
        '$bodyDescriptor form, ${element.name} elemental type, '
        'color palette: ${colorPalette.join(", ")}, '
        '$stance stance, power level: $powerLevel/20, '
        'rarity: ${rarity.name}, '
        'highly detailed, vibrant fantasy art style, digital painting, '
        'unique creature design, professional TCG art quality '
        '--no pokemon, nintendo, gamefreak, pikachu, charizard, '
        'yugioh, konami, magic, wizards, hasbro, digimon, bandai';
  }

  Map<String, dynamic> toJson() => {
        'powerLevel': powerLevel,
        'element': element.name,
        'rarity': rarity.name,
        'bodyDescriptor': bodyDescriptor,
        'colorPalette': colorPalette,
        'stance': stance,
        'cardFingerprint': cardFingerprint,
      };
}

/// The abstraction engine — strips all IP, outputs generic data
class CardAbstractionEngine {
  /// Type mapping — removes ALL IP-specific terms
  static const Map<String, Element> _typeMapping = {
    // Pokemon types
    'fire': Element.flame,
    'water': Element.aqua,
    'grass': Element.nature,
    'electric': Element.thunder,
    'psychic': Element.shadow,
    'fighting': Element.crystal,
    'dragon': Element.flame,
    'dark': Element.shadow,
    'fairy': Element.crystal,
    'ice': Element.aqua,
    'poison': Element.shadow,
    'ground': Element.nature,
    'rock': Element.nature,
    'bug': Element.nature,
    'ghost': Element.shadow,
    'steel': Element.crystal,
    'flying': Element.thunder,
    'normal': Element.crystal,
    // MTG colors
    'red': Element.flame,
    'blue': Element.aqua,
    'green': Element.nature,
    'white': Element.crystal,
    'black': Element.shadow,
    // Yu-Gi-Oh attributes
    'light': Element.crystal,
    'earth': Element.nature,
    'wind': Element.thunder,
    'divine': Element.crystal,
    // Generic fallbacks
    'flame': Element.flame,
    'aqua': Element.aqua,
    'nature': Element.nature,
    'thunder': Element.thunder,
    'shadow': Element.shadow,
    'crystal': Element.crystal,
  };

  /// Body type detection from CV silhouette analysis
  static const Map<String, String> _bodyDescriptors = {
    'dragon': 'winged-quadruped',
    'bird': 'flying-avian',
    'fish': 'aquatic-serpent',
    'humanoid': 'bipedal-fighter',
    'beast': 'feral-quadruped',
    'insect': 'multi-limbed-arthropod',
    'plant': 'rooted-flora',
    'ghost': 'ethereal-shade',
    'machine': 'mechanical-construct',
    'serpent': 'limbless-serpent',
    'amphibian': 'amphibious-hybrid',
    'fairy': 'winged-humanoid',
  };

  /// Rarity mapping
  static const Map<String, Rarity> _rarityMapping = {
    'common': Rarity.common,
    'uncommon': Rarity.uncommon,
    'rare': Rarity.rare,
    'holo rare': Rarity.rare,
    'rare holo': Rarity.rare,
    'ultra rare': Rarity.epic,
    'secret rare': Rarity.legendary,
    'amazing rare': Rarity.legendary,
    'hyper rare': Rarity.mythic,
    'illustration rare': Rarity.legendary,
    'special art rare': Rarity.mythic,
    'mythic rare': Rarity.mythic,
    'legendary': Rarity.legendary,
    'epic': Rarity.epic,
    // MTG
    'mythic': Rarity.mythic,
    // YGO
    'super rare': Rarity.epic,
    'ghost rare': Rarity.mythic,
    'starlight rare': Rarity.mythic,
  };

  /// Abstract a raw card scan into safe, generic data
  static AbstractedCardData abstract(RawCardData raw) {
    // 1. Map type to element (generic)
    final element = _typeMapping[raw.detectedType?.toLowerCase() ?? ''] ??
        Element.crystal;

    // 2. Calculate power level (1-20 scale)
    final powerLevel = raw.detectedHp != null
        ? (raw.detectedHp! / 15).round().clamp(1, 20)
        : 10;

    // 3. Map rarity
    final rarity = _rarityMapping[raw.detectedRarity?.toLowerCase() ?? ''] ??
        Rarity.common;

    // 4. Body descriptor
    final bodyDescriptor =
        _bodyDescriptors[raw.bodyType?.toLowerCase() ?? ''] ??
            'bipedal-fighter';

    // 5. Determine stance from stats
    final stance = powerLevel > 14
        ? 'aggressive'
        : powerLevel > 8
            ? 'neutral'
            : 'defensive';

    // 6. Generate card fingerprint (for dedup)
    final fingerprint = _generateFingerprint(raw);

    return AbstractedCardData(
      powerLevel: powerLevel,
      element: element,
      rarity: rarity,
      bodyDescriptor: bodyDescriptor,
      colorPalette: raw.dominantColors.isEmpty
          ? _defaultColors(element)
          : raw.dominantColors,
      stance: stance,
      cardFingerprint: fingerprint,
    );
  }

  static List<String> _defaultColors(Element element) {
    const colors = {
      Element.flame: ['#FF6B35', '#F7931E', '#FDB827'],
      Element.aqua: ['#0077B6', '#00B4D8', '#90E0EF'],
      Element.nature: ['#2D6A4F', '#40916C', '#95D5B2'],
      Element.thunder: ['#FFD60A', '#FFC300', '#FFE066'],
      Element.shadow: ['#2D1B69', '#5A189A', '#9D4EDD'],
      Element.crystal: ['#F8F9FA', '#E9ECEF', '#CED4DA'],
    };
    return colors[element] ?? ['#808080', '#A0A0A0', '#C0C0C0'];
  }

  static String _generateFingerprint(RawCardData raw) {
    // Hash based on type + HP range + rarity + body (NOT the card name)
    final components = [
      raw.detectedType ?? 'unknown',
      '${(raw.detectedHp ?? 0) ~/ 10}', // HP bucket
      raw.detectedRarity ?? 'common',
      raw.bodyType ?? 'unknown',
      raw.dominantColors.join(','),
    ];
    return components.join('|').hashCode.toRadixString(36);
  }
}
