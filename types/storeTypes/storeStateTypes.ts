import { Difficulty } from "../types";

export interface TileSet {
  setName: string;
  id: number;
  isUnlocked: boolean;
  isCurrentlyUsed: boolean;
  unlockedAt: { difficulty: Difficulty; level: number };
  tiles: string[]; // Paths to the tile images
}

export interface Purchase {
  setName: string;
  id: number;
  setPrice: number;
  allSetsPrice: number;
  isModalOpen: boolean;
}

export interface StoreStateType {
  tilesSets: TileSet[];
  purchase: Purchase;
}
