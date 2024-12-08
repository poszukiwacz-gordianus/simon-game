export const DEFAULT_DIFFICULTY = "easy";
export const DEFAULT_HINTS = 3;
export const DEFAULT_COINS = 0;
export const DEFAULT_ANIMATION_PACE = 650;
export const DEFAULT_ANIMATION_PACE_MEDIUM = 450;
export const DEFAULT_ANIMATION_PACE_HARD = 300;
export const DEFAULT_MAX_LEVELS = 30;
export const DEFAULT_DIFFICULTIES = {
  easy: { level: 1 },
  medium: { level: 1 },
  hard: { level: 1 },
};
export const START_GAME_DELAY = 1200;
export const START_LEVEL_DELAY = 500;
export const USER_RESPONSE_DELAY = 900;
export const WINNING_SOUND = 0;
export const GAME_OVER_SOUND = 1;
export const DEFAULT_TILE_SOUND_INDEX = 2;
export const DEFAULT_BEST_SCORE = 0;
export const DEFAULT_GAME_STATE_FROM_STORAGE = {
  bestScore: DEFAULT_BEST_SCORE,
  difficulties: DEFAULT_DIFFICULTIES,
  coins: DEFAULT_COINS,
  tileSoundIndex: DEFAULT_TILE_SOUND_INDEX,
};
export const STORAGE_GAME_STATE_KEY = "gameState";
export const STORAGE_STORE_STATE_KEY = "storeState";
export const STORAGE_GAME_ACTION = "GAME_LOAD_STATE";
export const STORAGE_STORE_ACTION = "STORE_LOAD_STATE";
