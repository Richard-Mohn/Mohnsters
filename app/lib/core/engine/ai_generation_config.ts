/// MohnSters AI Generation API Configuration
///
/// Defines the API contracts for:
/// - Leonardo.ai (2D character art generation)
/// - Meshy.ai (2D → 3D model conversion)
/// - Internal pipeline orchestration
///
/// Usage: Import into Cloud Functions for server-side API calls.
/// Client apps should NEVER call these APIs directly.

// ── Leonardo.ai Configuration ──
// Docs: https://docs.leonardo.ai/reference

export interface LeonardoConfig {
  apiKey: string;          // From Firebase Secret Manager
  baseUrl: string;
  modelId: string;         // Fine-tuned model for creature designs
  presetStyle: string;     // 'ANIME' | 'CREATIVE' | 'DYNAMIC' | 'NONE'
  width: number;
  height: number;
  numImages: number;       // Generate multiple, pick best
  guidanceScale: number;   // How closely to follow the prompt (7-15)
}

export const LEONARDO_DEFAULTS: Omit<LeonardoConfig, 'apiKey'> = {
  baseUrl: 'https://cloud.leonardo.ai/api/rest/v1',
  modelId: 'ac614f96-1082-45bf-be9d-757f2d31c174', // DreamShaper v7
  presetStyle: 'DYNAMIC',
  width: 768,
  height: 768,
  numImages: 4,
  guidanceScale: 9,
};

// Leonardo.ai API payload for image generation
export interface LeonardoGeneratePayload {
  prompt: string;
  negative_prompt: string;
  modelId: string;
  width: number;
  height: number;
  num_images: number;
  guidance_scale: number;
  presetStyle: string;
  seed?: number;
  sd_version: string;       // 'v2'
  scheduler: string;         // 'EULER_DISCRETE'
  public: boolean;           // false for private generation
  tiling: boolean;
}

export interface LeonardoGenerateResponse {
  sdGenerationJob: {
    generationId: string;
    apiCreditCost: number;
  };
}

export interface LeonardoImageResult {
  generations_by_pk: {
    generated_images: Array<{
      url: string;
      nsfw: boolean;
      id: string;
      likeCount: number;
      motionMP4URL: string | null;
    }>;
    modelId: string;
    prompt: string;
    status: string; // 'COMPLETE' | 'PENDING' | 'FAILED'
  };
}

// ── Meshy.ai Configuration ──
// Docs: https://docs.meshy.ai

export interface MeshyConfig {
  apiKey: string;          // From Firebase Secret Manager
  baseUrl: string;
  outputFormat: string;    // 'glb' for Three.js compatibility
  targetPolycount: number; // Keep low for real-time rendering
  textureResolution: number;
}

export const MESHY_DEFAULTS: Omit<MeshyConfig, 'apiKey'> = {
  baseUrl: 'https://api.meshy.ai/v2',
  outputFormat: 'glb',
  targetPolycount: 10000,   // Game-ready, not movie-quality
  textureResolution: 1024,
};

// Meshy.ai Image-to-3D payload
export interface MeshyImageTo3DPayload {
  image_url: string;
  enable_pbr: boolean;       // Physics-based rendering materials
  should_remesh: boolean;    // Clean topology
  topology: string;          // 'quad' | 'triangle'
  target_polycount: number;
  ai_model: string;          // 'meshy-4'
}

export interface MeshyTaskResponse {
  result: string; // task ID
}

export interface MeshyTaskResult {
  id: string;
  model_urls: {
    glb: string;
    fbx: string;
    obj: string;
    usdz: string;
  };
  thumbnail_url: string;
  texture_urls: Array<{
    base_color: string;
    metallic: string;
    normal: string;
    roughness: string;
  }>;
  status: string; // 'SUCCEEDED' | 'PENDING' | 'IN_PROGRESS' | 'FAILED'
  progress: number;
  task_error: string | null;
}

// ── Pipeline Orchestration ──

export interface PipelineStage {
  name: string;
  status: 'pending' | 'in_progress' | 'complete' | 'failed' | 'expired';
  startedAt: string | null;
  completedAt: string | null;
  error: string | null;
  retryCount: number;
  maxRetries: number;
}

export interface FullPipeline {
  id: string;
  ownerId: string;
  stages: {
    abstraction: PipelineStage;
    promptGeneration: PipelineStage;
    image2D: PipelineStage;
    model3D: PipelineStage;
    assetStorage: PipelineStage;
    collectionAdd: PipelineStage;
  };
  estimatedCost: {
    leonardoCredits: number;
    meshyCredits: number;
    totalUsd: number;
  };
  createdAt: string;
  updatedAt: string;
}

// ── Cost Estimation ──

export const COST_TABLE = {
  leonardo: {
    perImage: 0.004,     // ~$0.004 per image (4 images = ~$0.016)
    perGeneration: 0.016, // 4 images per generation
  },
  meshy: {
    perModel: 0.10,       // ~$0.10 per 3D model
    perTexture: 0.02,
  },
  storage: {
    perMB: 0.00002,       // Firebase Storage
  },
  total: {
    perMohnster: 0.14,    // Approximate total cost per character
  },
};

// ── Webhook Contracts ──

export interface LeonardoWebhookPayload {
  type: 'image_generation.complete';
  data: {
    generationId: string;
    status: string;
    images: Array<{ url: string; id: string }>;
  };
  timestamp: string;
}

export interface MeshyWebhookPayload {
  event: 'task.succeeded' | 'task.failed';
  data: {
    task_id: string;
    status: string;
    model_urls?: { glb: string };
    thumbnail_url?: string;
    error?: string;
  };
  timestamp: string;
}

// ── Firestore Schema ──

export const FIRESTORE_COLLECTIONS = {
  pipelines: 'generation_pipelines',
  mohnsters: 'mohnsters',
  users: 'users',
  userMohnsters: (uid: string) => `users/${uid}/mohnsters`,
};

// ── Three.js Viewer Config ──
// For rendering 3D models in the web app and Flutter WebView

export const THREEJS_VIEWER_CONFIG = {
  camera: {
    fov: 50,
    near: 0.1,
    far: 100,
    position: [0, 1.2, 3],
  },
  lighting: {
    ambient: { color: 0xffffff, intensity: 0.4 },
    directional: { color: 0xffffff, intensity: 0.8, position: [5, 5, 5] },
    rim: { color: 0x6366f1, intensity: 0.3, position: [-3, 2, -3] },
  },
  environment: {
    background: 0x0b0e14,  // Neon Dungeon dark
    fog: { color: 0x0b0e14, near: 8, far: 20 },
  },
  animation: {
    autoRotate: true,
    autoRotateSpeed: 1.5,
    enableDamping: true,
    dampingFactor: 0.05,
  },
  elementGlow: {
    flame: { color: 0xff6b35, intensity: 1.5 },
    aqua: { color: 0x00b4d8, intensity: 1.2 },
    nature: { color: 0x40916c, intensity: 1.0 },
    thunder: { color: 0xffd60a, intensity: 2.0 },
    shadow: { color: 0x9d4edd, intensity: 1.8 },
    crystal: { color: 0xe9ecef, intensity: 1.5 },
  },
};
