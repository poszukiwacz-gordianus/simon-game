import { type AnimatedTile } from "./componentProps";
import { type Difficulties } from "./gameStateTypes";
import { GenerateTileSequenceProps } from "./utilityTypes";

export type Action =
  | { type: "LOAD_GAME_STATE"; payload: Difficulties }
  | { type: "LOAD_TILES"; payload: AnimatedTile[] }
  | { type: "SET_DIFFICULTY"; payload: "easy" | "medium" | "hard" }
  | { type: "INITIALIZE_LEVEL"; payload: number }
  | { type: "SHOW_SEQUENCE"; payload: GenerateTileSequenceProps }
  | { type: "ENABLE_USER_RESPONSE" }
  | { type: "SHOW_HINT" }
  | { type: "VERIFY_USER_RESPONSE"; payload: number };
