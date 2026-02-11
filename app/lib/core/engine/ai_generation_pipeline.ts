/// MohnSters AI Character Generation Pipeline
///
/// Multi-stage pipeline for generating unique, IP-safe 3D characters:
/// 1. Card Scan (OCR) → Raw data extraction
/// 2. IP-Safe Abstraction → Strip ALL copyrighted content
/// 3. Prompt Engineering → Build AI generation prompt
/// 4. 2D Generation (Leonardo.ai) → Unique character art
/// 5. 3D Conversion (Meshy.ai) → Game-ready 3D model
/// 6. Asset Storage → Firebase Storage + Firestore metadata
///
/// This file contains Cloud Function handlers for each pipeline stage.

import * as functions from 'firebase-functions/v2';
import * as admin from 'firebase-admin';
import * as crypto from 'crypto';

// ── Types ──

interface RawCardData {
  ocrText: string;
  detectedName: string | null;
  detectedType: string | null;
  detectedPower: string | null;
  detectedRarity: string | null;
  detectedColors: string[];
  bodyDescriptors: string[];
  imageFingerprint: string;
}

interface AbstractedCardData {
  element: string;
  bodyType: string;
  sizeClass: string;
  rarityTier: string;
  colorPalette: string[];
  attributeProfile: {
    offenseWeight: number;
    defenseWeight: number;
    speedWeight: number;
    specialWeight: number;
  };
  fingerprint: string;
}

interface GenerationPrompt {
  positivePrompt: string;
  negativePrompt: string;
  styleGuide: string;
  seed: number;
}

interface PipelineResult {
  mohnsterId: string;
  name: string;
  element: string;
  rarity: string;
  stats: Record<string, number>;
  image2dUrl: string | null;
  model3dUrl: string | null;
  thumbnailUrl: string | null;
  pipelineStage: string;
  createdAt: string;
}

// ── Constants ──

const FRANCHISE_BLOCKLIST = [
  'pokemon', 'pokémon', 'pikachu', 'charizard', 'mewtwo', 'nintendo',
  'magic the gathering', 'mtg', 'wizards of the coast', 'planeswalker',
  'yu-gi-oh', 'yugioh', 'konami', 'duel monsters', 'exodia',
  'digimon', 'bandai', 'bakugan', 'beyblade',
  'game freak', 'creatures inc', 'the pokemon company',
];

const TYPE_TO_ELEMENT: Record<string, string> = {
  // Pokemon
  fire: 'flame', water: 'aqua', grass: 'nature', electric: 'thunder',
  psychic: 'crystal', dark: 'shadow', ghost: 'shadow', fairy: 'crystal',
  dragon: 'flame', ice: 'aqua', fighting: 'nature', steel: 'crystal',
  poison: 'shadow', ground: 'nature', rock: 'nature', bug: 'nature',
  flying: 'thunder', normal: 'crystal',
  // MTG
  red: 'flame', blue: 'aqua', green: 'nature', white: 'crystal',
  black: 'shadow', colorless: 'crystal',
  // YGO
  light: 'crystal', divine: 'crystal', fiend: 'shadow',
  warrior: 'nature', spellcaster: 'crystal', machine: 'thunder',
  beast: 'nature', aqua_type: 'aqua', pyro: 'flame',
};

const BODY_TYPE_MAP: Record<string, string> = {
  dragon: 'winged-quadruped', serpent: 'serpentine', bird: 'avian',
  beast: 'quadruped', humanoid: 'bipedal', fish: 'aquatic',
  insect: 'multi-limbed', golem: 'heavy-bipedal', spirit: 'amorphous',
  plant: 'rooted-organic', mechanical: 'construct', wolf: 'quadruped',
  cat: 'agile-quadruped', turtle: 'armored-quadruped',
  lizard: 'low-quadruped', snake: 'serpentine', eagle: 'raptor-avian',
};

const ELEMENT_PALETTES: Record<string, string[]> = {
  flame: ['crimson', 'amber', 'charcoal', 'molten-gold'],
  aqua: ['deep-blue', 'cyan', 'seafoam', 'pearl'],
  nature: ['forest-green', 'moss', 'bark-brown', 'golden-leaf'],
  thunder: ['electric-yellow', 'violet', 'white-hot', 'storm-grey'],
  shadow: ['deep-purple', 'midnight', 'blood-red', 'smoke'],
  crystal: ['prismatic-white', 'ice-blue', 'rose-quartz', 'silver'],
};

const RARITY_NAMES = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];

const NAME_PREFIXES: Record<string, string[]> = {
  flame: ['Pyre', 'Blaze', 'Ember', 'Scorch', 'Inferno', 'Cinder', 'Ash', 'Flare'],
  aqua: ['Tide', 'Frost', 'Rift', 'Wave', 'Coral', 'Dew', 'Mist', 'Surge'],
  nature: ['Bloom', 'Thorn', 'Root', 'Fern', 'Moss', 'Bark', 'Vine', 'Leaf'],
  thunder: ['Volt', 'Arc', 'Zap', 'Bolt', 'Storm', 'Pulse', 'Flash', 'Spark'],
  shadow: ['Shade', 'Dusk', 'Nyx', 'Void', 'Wraith', 'Grim', 'Haze', 'Murk'],
  crystal: ['Prism', 'Lux', 'Gem', 'Shard', 'Glint', 'Aura', 'Star', 'Gleam'],
};

const NAME_SUFFIXES: Record<string, string[]> = {
  common: ['pup', 'kit', 'mote', 'wisp', 'sprite'],
  uncommon: ['claw', 'fang', 'wing', 'strike', 'guard'],
  rare: ['lord', 'fury', 'bane', 'heart', 'soul'],
  epic: ['apex', 'titan', 'wrath', 'storm', 'blade'],
  legendary: ['sovereign', 'oracle', 'archon', 'phoenix', 'prime'],
  mythic: ['eternal', 'genesis', 'omega', 'infinity', 'absolute'],
};

// ── Pipeline Functions ──

/**
 * Stage 1: Abstract card data — strip ALL copyrighted content
 */
function abstractCardData(raw: RawCardData): AbstractedCardData {
  // Detect element from type keywords
  let element = 'crystal'; // default
  const lowerText = raw.ocrText.toLowerCase();
  for (const [keyword, el] of Object.entries(TYPE_TO_ELEMENT)) {
    if (lowerText.includes(keyword) || raw.detectedType?.toLowerCase().includes(keyword)) {
      element = el;
      break;
    }
  }

  // Detect body type
  let bodyType = 'bipedal'; // default
  for (const descriptor of raw.bodyDescriptors) {
    const mapped = BODY_TYPE_MAP[descriptor.toLowerCase()];
    if (mapped) { bodyType = mapped; break; }
  }

  // Map rarity
  let rarityTier = 'common';
  if (raw.detectedRarity) {
    const r = raw.detectedRarity.toLowerCase();
    if (r.includes('mythic') || r.includes('secret') || r.includes('ultra')) rarityTier = 'mythic';
    else if (r.includes('legend') || r.includes('full art')) rarityTier = 'legendary';
    else if (r.includes('epic') || r.includes('ultra') || r.includes('ex')) rarityTier = 'epic';
    else if (r.includes('rare') || r.includes('holo')) rarityTier = 'rare';
    else if (r.includes('uncommon') || r.includes('reverse')) rarityTier = 'uncommon';
  }

  // Size from power level
  let sizeClass = 'medium';
  if (raw.detectedPower) {
    const power = parseInt(raw.detectedPower);
    if (power >= 200) sizeClass = 'colossal';
    else if (power >= 100) sizeClass = 'large';
    else if (power >= 50) sizeClass = 'medium';
    else sizeClass = 'small';
  }

  // Build attribute profile from detected stats
  const offenseWeight = 0.4 + Math.random() * 0.3;
  const defenseWeight = 0.3 + Math.random() * 0.3;
  const speedWeight = 0.3 + Math.random() * 0.3;
  const specialWeight = 0.2 + Math.random() * 0.3;
  const total = offenseWeight + defenseWeight + speedWeight + specialWeight;

  // Generate fingerprint (dedup check)
  const fingerprint = crypto
    .createHash('sha256')
    .update(`${element}|${bodyType}|${rarityTier}|${sizeClass}|${raw.imageFingerprint}`)
    .digest('hex')
    .substring(0, 16);

  return {
    element,
    bodyType,
    sizeClass,
    rarityTier,
    colorPalette: ELEMENT_PALETTES[element] || ELEMENT_PALETTES.crystal,
    attributeProfile: {
      offenseWeight: offenseWeight / total,
      defenseWeight: defenseWeight / total,
      speedWeight: speedWeight / total,
      specialWeight: specialWeight / total,
    },
    fingerprint,
  };
}

/**
 * Stage 2: Build AI-generation prompt — completely franchise-free
 */
function buildGenerationPrompt(abstracted: AbstractedCardData): GenerationPrompt {
  const palette = abstracted.colorPalette.join(', ');
  const seed = parseInt(abstracted.fingerprint.substring(0, 8), 16) % 999999;

  const positivePrompt = [
    `original fantasy creature design, ${abstracted.bodyType} body type`,
    `${abstracted.sizeClass} size, ${abstracted.element} elemental theme`,
    `color palette: ${palette}`,
    `high detail, game-ready character, clean silhouette`,
    `front 3/4 view, white background, concept art style`,
    `unique original design, no existing IP`,
    `creature design sheet, professional game art`,
  ].join(', ');

  const negativePrompt = [
    // Block ALL franchise content
    ...FRANCHISE_BLOCKLIST,
    // Block specific art styles that could match existing IP
    'trademark', 'logo', 'text', 'watermark', 'copyright',
    'anime style', 'cartoon network', 'disney style',
    'card game art', 'trading card', 'existing character',
    // Quality negatives
    'blurry', 'low quality', 'deformed', 'disfigured', 'bad anatomy',
    'extra limbs', 'duplicate', 'morbid', 'mutilated',
  ].join(', ');

  const styleGuide = `MohnSters creature design: ${abstracted.element} element, ` +
    `${abstracted.bodyType} body, ${abstracted.sizeClass} scale. ` +
    `Render as a unique fantasy creature with bioluminescent ${abstracted.element} accents. ` +
    `Must be 100% original — no resemblance to any existing franchise character.`;

  return { positivePrompt, negativePrompt, styleGuide, seed };
}

/**
 * Stage 3: Generate creature name (random, element-appropriate)
 */
function generateCreatureName(element: string, rarity: string): string {
  const prefixes = NAME_PREFIXES[element] || NAME_PREFIXES.crystal;
  const suffixes = NAME_SUFFIXES[rarity] || NAME_SUFFIXES.common;
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${prefix}${suffix}`;
}

/**
 * Stage 4: Generate stats from abstracted data + rarity
 */
function generateStats(abstracted: AbstractedCardData): Record<string, number> {
  const RARITY_RANGES: Record<string, [number, number]> = {
    common: [40, 60], uncommon: [55, 75], rare: [70, 90],
    epic: [85, 105], legendary: [100, 120], mythic: [115, 135],
  };

  const [min, max] = RARITY_RANGES[abstracted.rarityTier] || RARITY_RANGES.common;
  const range = max - min;
  const profile = abstracted.attributeProfile;

  // Distribute stats according to the creature's attribute profile
  const randomize = (weight: number) => Math.round(min + range * weight + (Math.random() - 0.5) * 10);

  return {
    atk: Math.min(135, Math.max(1, randomize(profile.offenseWeight))),
    def: Math.min(135, Math.max(1, randomize(profile.defenseWeight))),
    spd: Math.min(135, Math.max(1, randomize(profile.speedWeight))),
    hp: Math.min(135, Math.max(1, randomize((profile.defenseWeight + profile.offenseWeight) / 2))),
    sp: Math.min(135, Math.max(1, randomize(profile.specialWeight))),
  };
}

// ── Cloud Functions ──

/**
 * HTTP function: Initiate character generation pipeline from a card scan
 * Input: { ocrText, detectedName, detectedType, detectedPower, detectedRarity, detectedColors, bodyDescriptors, imageFingerprint }
 * Output: { pipelineId, stage, mohnster preview data }
 */
export const initiateCharacterGeneration = functions.https.onCall(async (request) => {
  const { data, auth } = request;
  if (!auth?.uid) throw new functions.https.HttpsError('unauthenticated', 'Must be signed in');

  const db = admin.firestore();

  // Stage 1: Abstract the card data
  const rawCardData: RawCardData = {
    ocrText: data.ocrText || '',
    detectedName: data.detectedName || null,
    detectedType: data.detectedType || null,
    detectedPower: data.detectedPower || null,
    detectedRarity: data.detectedRarity || null,
    detectedColors: data.detectedColors || [],
    bodyDescriptors: data.bodyDescriptors || [],
    imageFingerprint: data.imageFingerprint || crypto.randomBytes(8).toString('hex'),
  };

  const abstracted = abstractCardData(rawCardData);

  // Check for duplicate fingerprint
  const existing = await db.collection('mohnsters')
    .where('fingerprint', '==', abstracted.fingerprint)
    .where('ownerId', '==', auth.uid)
    .limit(1)
    .get();

  if (!existing.empty) {
    throw new functions.https.HttpsError('already-exists', 'You already own a MohnSter from this card scan');
  }

  // Stage 2: Build generation prompt
  const prompt = buildGenerationPrompt(abstracted);

  // Stage 3: Generate name and stats
  const name = generateCreatureName(abstracted.element, abstracted.rarityTier);
  const stats = generateStats(abstracted);

  // Create pipeline record
  const pipelineId = crypto.randomBytes(12).toString('hex');
  const result: PipelineResult = {
    mohnsterId: pipelineId,
    name,
    element: abstracted.element,
    rarity: abstracted.rarityTier,
    stats,
    image2dUrl: null,
    model3dUrl: null,
    thumbnailUrl: null,
    pipelineStage: 'prompt_ready',
    createdAt: new Date().toISOString(),
  };

  // Save to Firestore
  await db.collection('generation_pipelines').doc(pipelineId).set({
    ownerId: auth.uid,
    rawFingerprint: rawCardData.imageFingerprint,
    abstracted,
    prompt,
    result,
    status: 'prompt_ready',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // TODO: In production, this triggers Stage 4 (Leonardo.ai API call)
  // For now, return the prompt data so the client can preview
  return {
    pipelineId,
    preview: result,
    prompt: prompt.positivePrompt,
    negativePrompt: prompt.negativePrompt,
    message: 'Pipeline initiated. 2D generation will begin shortly.',
  };
});

/**
 * HTTP function: Complete 2D generation (called by Leonardo.ai webhook or manual trigger)
 * In production: Leonardo.ai calls this after generating the image
 */
export const complete2DGeneration = functions.https.onCall(async (request) => {
  const { data, auth } = request;
  if (!auth?.uid) throw new functions.https.HttpsError('unauthenticated', 'Must be signed in');

  const db = admin.firestore();
  const { pipelineId, imageUrl } = data;

  const pipelineRef = db.collection('generation_pipelines').doc(pipelineId);
  const pipeline = await pipelineRef.get();

  if (!pipeline.exists) throw new functions.https.HttpsError('not-found', 'Pipeline not found');
  if (pipeline.data()?.ownerId !== auth.uid) throw new functions.https.HttpsError('permission-denied', 'Not your pipeline');

  await pipelineRef.update({
    'result.image2dUrl': imageUrl,
    'result.pipelineStage': '2d_complete',
    status: '2d_complete',
  });

  // TODO: Trigger Meshy.ai 3D conversion
  return { status: '2d_complete', message: '2D art received. 3D conversion queued.' };
});

/**
 * HTTP function: Complete 3D conversion (called by Meshy.ai webhook or manual trigger)
 * Finalizes the MohnSter and adds it to the user's collection
 */
export const complete3DGeneration = functions.https.onCall(async (request) => {
  const { data, auth } = request;
  if (!auth?.uid) throw new functions.https.HttpsError('unauthenticated', 'Must be signed in');

  const db = admin.firestore();
  const { pipelineId, modelUrl, thumbnailUrl } = data;

  const pipelineRef = db.collection('generation_pipelines').doc(pipelineId);
  const pipeline = await pipelineRef.get();
  const pData = pipeline.data();

  if (!pipeline.exists || !pData) throw new functions.https.HttpsError('not-found', 'Pipeline not found');
  if (pData.ownerId !== auth.uid) throw new functions.https.HttpsError('permission-denied', 'Not your pipeline');

  // Finalize pipeline
  await pipelineRef.update({
    'result.model3dUrl': modelUrl,
    'result.thumbnailUrl': thumbnailUrl,
    'result.pipelineStage': 'complete',
    status: 'complete',
  });

  // Create the actual MohnSter in the user's collection
  const mohnster = {
    id: pipelineId,
    ownerId: auth.uid,
    name: pData.result.name,
    element: pData.result.element,
    rarity: pData.result.rarity,
    level: 1,
    xp: 0,
    stats: pData.result.stats,
    image2dUrl: pData.result.image2dUrl,
    model3dUrl: modelUrl,
    thumbnailUrl: thumbnailUrl,
    state: 'active',
    linkedNodeId: null,
    isSupercharged: false,
    wins: 0,
    losses: 0,
    abilities: [],
    fingerprint: pData.abstracted.fingerprint,
    source: 'card_scan',
    eggId: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection('mohnsters').doc(pipelineId).set(mohnster);

  // Also add to user's sub-collection for quick queries
  await db.collection('users').doc(auth.uid).collection('mohnsters').doc(pipelineId).set({
    mohnsterId: pipelineId,
    name: mohnster.name,
    element: mohnster.element,
    rarity: mohnster.rarity,
    level: mohnster.level,
    thumbnailUrl: mohnster.thumbnailUrl,
    addedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return {
    status: 'complete',
    mohnster: {
      id: pipelineId,
      name: mohnster.name,
      element: mohnster.element,
      rarity: mohnster.rarity,
      stats: mohnster.stats,
    },
    message: `${mohnster.name} has been added to your collection!`,
  };
});

/**
 * Scheduled function: Clean up stale pipelines (older than 24h with incomplete status)
 */
export const cleanupStalePipelines = functions.scheduler.onSchedule('every 6 hours', async () => {
  const db = admin.firestore();
  const staleThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const stale = await db.collection('generation_pipelines')
    .where('status', 'in', ['prompt_ready', '2d_complete'])
    .where('createdAt', '<', staleThreshold)
    .limit(100)
    .get();

  const batch = db.batch();
  stale.docs.forEach(doc => {
    batch.update(doc.ref, { status: 'expired' });
  });
  await batch.commit();

  console.log(`Cleaned up ${stale.size} stale pipelines`);
});
