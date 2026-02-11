/* ═══════════════════════════════════════════════════════════
   MohnSter Generator — Creates random creatures for packs
   ═══════════════════════════════════════════════════════════ */

const ELEMENTS = ['fire', 'water', 'earth', 'lightning', 'shadow', 'crystal'] as const;
type Element = typeof ELEMENTS[number];
type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';

const MONSTER_NAMES: Record<Element, string[]> = {
  fire: ['Infernak', 'Blazeclaw', 'Pyroscale', 'Emberwyrm', 'Charfiend', 'Moltenback', 'Flamefang', 'Scorchling', 'Ashborne', 'Cinderjaw'],
  water: ['Aquafang', 'Tidalcrest', 'Deepcurrent', 'Mistfin', 'Wavecrasher', 'Coralspine', 'Abyssmaw', 'Frostpool', 'Surfclaw', 'Ripplehost'],
  earth: ['Thornback', 'Bouldercrush', 'Rootweaver', 'Terralix', 'Stoneguard', 'Mossclaw', 'Quakefist', 'Dustwyrm', 'Ironbark', 'Pebbletusk'],
  lightning: ['Voltusk', 'Sparkfin', 'Thunderclaw', 'Stormbolt', 'Shockspine', 'Zapscale', 'Surgefiend', 'Arcwing', 'Magnapulse', 'Joltmaw'],
  shadow: ['Gloomclaw', 'Nightshade', 'Voidwalker', 'Duskfang', 'Phantomwing', 'Shadowmere', 'Darkspine', 'Ecliptor', 'Wraithfire', 'Netherclaw'],
  crystal: ['Crystara', 'Prismatic', 'Gemheart', 'Shardwing', 'Diamondfang', 'Quartzback', 'Opalcrest', 'Glitterscale', 'Facetfiend', 'Lustrebane'],
};

const EMOJIS: Record<Element, string[]> = {
  fire: ['🐉', '🔥', '🌋', '☄️'],
  water: ['🦑', '🐙', '🐋', '💧'],
  earth: ['🌿', '🦎', '🐢', '🌳'],
  lightning: ['⚡', '🦅', '🌩️', '💥'],
  shadow: ['👾', '👻', '💀', '🦇'],
  crystal: ['💎', '🔮', '✨', '🧿'],
};

/* ─── Stat Ranges by Rarity ─── */
const STAT_RANGES: Record<Rarity, { min: number; max: number }> = {
  common: { min: 20, max: 50 },
  uncommon: { min: 35, max: 65 },
  rare: { min: 50, max: 80 },
  legendary: { min: 65, max: 95 },
  mythic: { min: 80, max: 100 },
};

/* ─── Pack Odds ─── */
const PACK_ODDS: Record<string, Record<Rarity, number>> = {
  common: { common: 0.60, uncommon: 0.30, rare: 0.10, legendary: 0, mythic: 0 },
  rare: { common: 0, uncommon: 0.40, rare: 0.40, legendary: 0.15, mythic: 0.05 },
  legendary: { common: 0, uncommon: 0, rare: 0.30, legendary: 0.50, mythic: 0.20 },
  mythic: { common: 0, uncommon: 0, rare: 0, legendary: 0.50, mythic: 0.50 },
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rollRarity(packTier: string): Rarity {
  const odds = PACK_ODDS[packTier] || PACK_ODDS.common;
  const roll = Math.random();
  let cumulative = 0;

  for (const [rarity, chance] of Object.entries(odds)) {
    cumulative += chance;
    if (roll <= cumulative) {
      return rarity as Rarity;
    }
  }

  return 'common';
}

export interface GeneratedMohnSter {
  name: string;
  element: Element;
  rarity: Rarity;
  emoji: string;
  hp: number;
  atk: number;
  def: number;
  spd: number;
  special: number;
  level: number;
}

export function generateMohnSter(packTier: string): GeneratedMohnSter {
  const rarity = rollRarity(packTier);
  const element = randomChoice(ELEMENTS);
  const range = STAT_RANGES[rarity];

  return {
    name: randomChoice(MONSTER_NAMES[element]),
    element,
    rarity,
    emoji: randomChoice(EMOJIS[element]),
    hp: randomInt(range.min, range.max),
    atk: randomInt(range.min, range.max),
    def: randomInt(range.min, range.max),
    spd: randomInt(range.min, range.max),
    special: randomInt(range.min, range.max),
    level: 1,
  };
}

export function generatePack(packTier: string, cardCount: number): GeneratedMohnSter[] {
  const creatures: GeneratedMohnSter[] = [];

  for (let i = 0; i < cardCount; i++) {
    creatures.push(generateMohnSter(packTier));
  }

  // Pity system: Mythic packs guarantee at least 1 mythic
  if (packTier === 'mythic') {
    const hasMythic = creatures.some((c) => c.rarity === 'mythic');
    if (!hasMythic) {
      creatures[0] = generateMohnSter('mythic');
      // Force to mythic
      creatures[0].rarity = 'mythic';
      const range = STAT_RANGES.mythic;
      creatures[0].hp = randomInt(range.min, range.max);
      creatures[0].atk = randomInt(range.min, range.max);
      creatures[0].def = randomInt(range.min, range.max);
      creatures[0].spd = randomInt(range.min, range.max);
      creatures[0].special = randomInt(range.min, range.max);
    }
  }

  return creatures;
}

/* ─── Battle Resolution ─── */

const ELEMENT_ADVANTAGES: Record<Element, Element> = {
  fire: 'earth',
  earth: 'lightning',
  lightning: 'water',
  water: 'fire',
  shadow: 'crystal',
  crystal: 'shadow',
};

export function resolveBattle(
  playerTeam: { name: string; element: Element; hp: number; atk: number; def: number; spd: number }[],
  opponentTeam: { name: string; element: Element; hp: number; atk: number; def: number; spd: number }[]
): { winner: 'player' | 'opponent'; log: string[]; mohnReward: number; xpReward: number } {
  const log: string[] = [];
  let playerScore = 0;
  let opponentScore = 0;

  // Simple auto-battler: each creature fights its opposing slot
  for (let i = 0; i < Math.min(playerTeam.length, opponentTeam.length); i++) {
    const p = playerTeam[i];
    const o = opponentTeam[i];

    let pMultiplier = 1;
    let oMultiplier = 1;

    // Element advantages
    if (ELEMENT_ADVANTAGES[p.element] === o.element) {
      pMultiplier = 1.3;
      log.push(`${p.name}'s ${p.element} is super effective against ${o.name}'s ${o.element}!`);
    }
    if (ELEMENT_ADVANTAGES[o.element] === p.element) {
      oMultiplier = 1.3;
      log.push(`${o.name}'s ${o.element} is super effective against ${p.name}'s ${p.element}!`);
    }

    const pPower = (p.atk * pMultiplier + p.spd * 0.5) * (1 - o.def / 200);
    const oPower = (o.atk * oMultiplier + o.spd * 0.5) * (1 - p.def / 200);

    if (pPower >= oPower) {
      playerScore++;
      log.push(`${p.name} defeats ${o.name}! (${Math.round(pPower)} vs ${Math.round(oPower)})`);
    } else {
      opponentScore++;
      log.push(`${o.name} defeats ${p.name}! (${Math.round(oPower)} vs ${Math.round(pPower)})`);
    }
  }

  const winner = playerScore >= opponentScore ? 'player' : 'opponent';
  const mohnReward = winner === 'player' ? randomInt(20, 100) : 0;
  const xpReward = winner === 'player' ? 50 : 15;

  log.push(winner === 'player' ? `Victory! You earned ${mohnReward} $MOHN and ${xpReward} XP!` : `Defeat. You earned ${xpReward} XP.`);

  return { winner, log, mohnReward, xpReward };
}
