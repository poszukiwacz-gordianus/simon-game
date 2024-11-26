import {
  type AnimatedTile,
  type GenerateTileSequenceProps,
} from "../componentTypes";
import { type Difficulties } from "./gameStateTypes";

export type GameActionType =
  | { type: "LOAD_GAME_STATE"; payload: Difficulties }
  | {
      type: "LOAD_DEFAULT_CONTENT";
      payload: {
        tiles: AnimatedTile[];
        tileSound: () => void;
        gameOverSound: () => void;
      };
    }
  | { type: "SET_DIFFICULTY"; payload: "easy" | "medium" | "hard" }
  | { type: "INITIALIZE_LEVEL"; payload: number }
  | { type: "SHOW_SEQUENCE"; payload: GenerateTileSequenceProps }
  | { type: "ENABLE_USER_RESPONSE" }
  | { type: "SHOW_HINT" }
  | { type: "VERIFY_USER_RESPONSE"; payload: number };
