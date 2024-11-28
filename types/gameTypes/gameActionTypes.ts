import { type AnimatedTile } from "../componentTypes";
import { type Difficulty, type LoadGameState } from "./gameStateTypes";

export type GameActionType =
  | {
      type: "LOAD_GAME_STATE";
      payload: LoadGameState;
    }
  | {
      type: "LOAD_DEFAULT_CONTENT";
      payload: {
        tiles: AnimatedTile[];
        tileSound: () => void;
        gameOverSound: () => void;
      };
    }
  | { type: "TOGGLE_SOUND" }
  | { type: "SET_DIFFICULTY"; payload: Difficulty }
  | { type: "SET_SOUND_INDEX"; payload: number }
  | { type: "SET_INFINITE_MODE"; payload: boolean }
  | { type: "INITIALIZE_LEVEL"; payload: number }
  | { type: "SHOW_SEQUENCE"; payload: (length: number) => number[] }
  | { type: "ENABLE_USER_RESPONSE" }
  | { type: "SHOW_HINT" }
  | { type: "VERIFY_USER_RESPONSE"; payload: number };
