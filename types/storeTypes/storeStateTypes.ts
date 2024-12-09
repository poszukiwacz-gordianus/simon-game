import { ImageSourcePropType } from "react-native";
import { Difficulty } from "../types";

export interface Wallpapers {
  id: number;
  isUnlocked: boolean;
  isDownloaded: boolean;
  fileUri: string;
}

export interface TileSet {
  setName: string;
  id: number;
  isUnlocked: boolean;
  isCurrentlyUsed: boolean;
  unlockedAt: { difficulty: Difficulty; level: number };
  tiles: ImageSourcePropType[];
  wallpapers: Wallpapers[];
}

export interface TileSetPurchase {
  setName: string;
  id: number;
  setPrice: number;
  allSetsPrice: number;
  isModalOpen: boolean;
}

export interface StoreStateType {
  tilesSets: TileSet[];
  tileSetPurchase: TileSetPurchase;
  wallpaperModal: boolean;
}
