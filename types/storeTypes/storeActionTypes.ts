import { Difficulty, StoreStateType } from "../types";

export type StoreActionType =
  | { type: "STORE_LOAD_STATE"; payload: StoreStateType }
  | { type: "STORE_TOGGLE_MODAL" }
  | { type: "STORE_SET_PURCHASE"; payload: { id: number; setName: string } }
  | {
      type: "STORE_UNLOCK_SET_TILES";
      payload: { difficulty: Difficulty; level: number };
    }
  | { type: "STORE_SET_CURRENT_TILESET"; payload: number }
  | { type: "STORE_RESET_STATE" };
