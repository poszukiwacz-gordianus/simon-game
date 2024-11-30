import { MutableRefObject } from "react";
import { type AnimatedTile } from "../componentTypes";
import { type Difficulty, type LoadGameState } from "./gameStateTypes";
import { Audio } from "expo-av";

export type GameActionType =
  | {
      type: "LOAD_GAME_STATE";
      payload: LoadGameState;
    }
  | {
      type: "LOAD_DEFAULT_CONTENT";
      payload: {
        tiles: AnimatedTile[];
        tilesSounds: Audio.Sound[];
        timeoutRefs: MutableRefObject<number[]>;
      };
    }
  | { type: "TOGGLE_SOUND" }
  | { type: "SET_DIFFICULTY"; payload: Difficulty }
  | { type: "SET_SOUND_INDEX"; payload: number }
  | { type: "SET_INFINITE_MODE"; payload: boolean }
  | { type: "SET_TIMEOUT_REFS"; payload: MutableRefObject<number[]> }
  | { type: "INITIALIZE_LEVEL"; payload: number }
  | { type: "SHOW_SEQUENCE" }
  | { type: "ENABLE_USER_RESPONSE" }
  | { type: "SHOW_HINT" }
  | { type: "VERIFY_USER_RESPONSE"; payload: number }
  | { type: "RESET_APP_STATE" };
