import { MutableRefObject } from "react";
import { Audio } from "expo-av";
import { type AnimatedTile } from "../componentTypes";
import { type Difficulty, type LoadGameState } from "./gameStateTypes";

export type GameActionType =
  | { type: "GAME_LOAD_STATE"; payload: LoadGameState }
  | {
      type: "GAME_LOAD_CONTENT";
      payload: {
        tiles: AnimatedTile[];
        tilesSounds: Audio.Sound[];
        timeoutRefs: MutableRefObject<number[]>;
      };
    }
  | { type: "GAME_TOGGLE_SOUND" }
  | { type: "GAME_SET_DIFFICULTY"; payload: Difficulty }
  | { type: "GAME_SET_SOUND_INDEX"; payload: number }
  | { type: "GAME_SET_INFINITE_MODE"; payload: boolean }
  | { type: "GAME_SET_TILES"; payload: AnimatedTile[] }
  | { type: "GAME_SET_TIMEOUT_REFS"; payload: MutableRefObject<number[]> }
  | { type: "GAME_INITIALIZE_LEVEL"; payload: number }
  | { type: "GAME_SHOW_SEQUENCE" }
  | { type: "GAME_ENABLE_USER_RESPONSE" }
  | { type: "GAME_SHOW_HINT" }
  | { type: "GAME_VERIFY_USER_RESPONSE"; payload: number }
  | { type: "GAME_USE_COINS"; payload: number }
  | { type: "GAME_RESET_STATE" };
