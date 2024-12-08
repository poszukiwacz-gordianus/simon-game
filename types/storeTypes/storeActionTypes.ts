import { Difficulty, StoreStateType, TileSet } from "../types";

export type StoreActionType =
  | { type: "STORE_LOAD_STATE"; payload: StoreStateType }
  | { type: "STORE_TOGGLE_MODAL" }
  | { type: "STORE_SET_PURCHASE"; payload: { id: number; setName: string } }
  | {
      type: "STORE_UNLOCK_SET_TILES";
      payload: { difficulty: Difficulty; level: number };
    }
  | { type: "STORE_SET_CURRENT_TILESET"; payload: number }
  | {
      type: "STORE_SET_WALLPAPER";
      payload: { setId: number; wallpaperId: number; fileUri: string };
    }
  | { type: "STORE_RESET_STATE" };
