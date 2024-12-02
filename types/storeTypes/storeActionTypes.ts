import { Difficulty, StoreStateType } from "../types";

export type StoreActionType =
  | { type: "TOGGLE_MODAL" }
  | { type: "SET_PURCHASE"; payload: { id: number; setName: string } }
  | {
      type: "UNLOCK_SET_TILES";
      payload: { difficulty: Difficulty; level: number };
    }
  | { type: "SET_CURRENT_TILESET"; payload: number }
  | { type: "LOAD_STORE_STATE"; payload: StoreStateType }
  | { type: "RESET_STORE_STATE" };
