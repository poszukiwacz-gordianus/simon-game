import {
  classicTiles,
  treeTiles,
  oceanTiles,
  transportTiles,
  dogTiles,
  catTiles,
  planetTiles,
  fantasyTiles,
  sfTiles,
  steampunkTiles,
} from "@/assets/images/tiles";

import { saveStateToStorage } from "@/utils/helpers";
import { createContext, useContext, useReducer } from "react";
import { STORAGE_STORE_STATE_KEY } from "@/config";

import {
  type StoreContextProviderProps,
  type StoreContextType,
  type StoreReducer,
  type StoreStateType,
} from "@/types/types";

const StoreContext = createContext<StoreContextType | null>(null);

const initialState: StoreStateType = {
  tilesSets: [
    {
      setName: "Classic",
      id: 1,
      isUnlocked: true,
      isCurrentlyUsed: true,
      unlockedAt: { difficulty: "easy", level: 0 },
      tiles: classicTiles,
      wallpapers: [
        {
          id: 1,
          isUnlocked: true,
          isDownloaded: false,
          fileUri: "",
        },
        { id: 2, isUnlocked: true, isDownloaded: false, fileUri: "" },
        { id: 3, isUnlocked: true, isDownloaded: false, fileUri: "" },
        { id: 4, isUnlocked: true, isDownloaded: false, fileUri: "" },
      ],
    },
    {
      setName: "Trees",
      id: 2,
      isUnlocked: true,
      isCurrentlyUsed: false,
      unlockedAt: { difficulty: "easy", level: 10 },
      tiles: treeTiles,
      wallpapers: [
        { id: 5, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 6, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 7, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 8, isUnlocked: false, isDownloaded: false, fileUri: "" },
      ],
    },
    {
      setName: "Ocean",
      id: 3,
      isUnlocked: true,
      isCurrentlyUsed: false,
      unlockedAt: { difficulty: "easy", level: 20 },
      tiles: oceanTiles,
      wallpapers: [
        { id: 9, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 10, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 11, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 12, isUnlocked: false, isDownloaded: false, fileUri: "" },
      ],
    },
    {
      setName: "Transport",
      id: 4,
      isUnlocked: true,
      isCurrentlyUsed: false,
      unlockedAt: { difficulty: "easy", level: 30 },
      tiles: transportTiles,
      wallpapers: [
        { id: 13, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 14, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 15, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 16, isUnlocked: false, isDownloaded: false, fileUri: "" },
      ],
    },
    {
      setName: "Dogs",
      id: 5,
      isUnlocked: true,
      isCurrentlyUsed: false,
      unlockedAt: { difficulty: "medium", level: 10 },
      tiles: dogTiles,
      wallpapers: [
        { id: 17, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 18, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 19, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 20, isUnlocked: false, isDownloaded: false, fileUri: "" },
      ],
    },
    {
      setName: "Cats",
      id: 6,
      isUnlocked: true,
      isCurrentlyUsed: false,
      unlockedAt: { difficulty: "medium", level: 20 },
      tiles: catTiles,
      wallpapers: [
        { id: 21, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 22, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 23, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 24, isUnlocked: false, isDownloaded: false, fileUri: "" },
      ],
    },
    {
      setName: "Planets",
      id: 7,
      isUnlocked: true,
      isCurrentlyUsed: false,
      unlockedAt: { difficulty: "medium", level: 30 },
      tiles: planetTiles,
      wallpapers: [
        { id: 25, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 26, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 27, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 28, isUnlocked: false, isDownloaded: false, fileUri: "" },
      ],
    },
    {
      setName: "Fantasy",
      id: 8,
      isUnlocked: true,
      isCurrentlyUsed: false,
      unlockedAt: { difficulty: "hard", level: 10 },
      tiles: fantasyTiles,
      wallpapers: [
        { id: 29, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 30, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 31, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 32, isUnlocked: false, isDownloaded: false, fileUri: "" },
      ],
    },
    {
      setName: "Si-Fi",
      id: 9,
      isUnlocked: true,
      isCurrentlyUsed: false,
      unlockedAt: { difficulty: "hard", level: 20 },
      tiles: sfTiles,
      wallpapers: [
        { id: 33, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 34, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 35, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 36, isUnlocked: false, isDownloaded: false, fileUri: "" },
      ],
    },
    {
      setName: "Steampunk",
      id: 10,
      isUnlocked: true,
      isCurrentlyUsed: false,
      unlockedAt: { difficulty: "hard", level: 30 },
      tiles: steampunkTiles,
      wallpapers: [
        { id: 37, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 38, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 39, isUnlocked: false, isDownloaded: false, fileUri: "" },
        { id: 40, isUnlocked: false, isDownloaded: false, fileUri: "" },
      ],
    },
  ],
  tileSetPurchase: {
    setName: "",
    id: 0,
    setPrice: 1,
    allSetsPrice: 10,
    isModalOpen: false,
  },
  wallpaperModal: false,
};

const storeReducer: StoreReducer = (state, action) => {
  // console.log("storeReducer");
  switch (action.type) {
    case "STORE_LOAD_STATE": {
      // console.log("LOAD_STORE_STATE");
      if (action.payload) return action.payload;
      return state;
    }

    case "STORE_TOGGLE_MODAL":
      // console.log("TOGGLE_MODAL");
      return {
        ...state,
        tileSetPurchase: {
          ...state.tileSetPurchase,
          isModalOpen: false,
        },
        wallpaperModal: false,
      };

    case "STORE_SET_TILESET_PURCHASE": {
      // console.log("SET_PURCHASE");
      const { id, setName } = action.payload;
      return {
        ...state,
        tileSetPurchase: {
          ...state.tileSetPurchase,
          isModalOpen: !state.tileSetPurchase.isModalOpen,
          id,
          setName,
        },
      };
    }

    case "STORE_SET_WALLPAPER_MODAL": {
      return {
        ...state,
        wallpaperModal: true,
      };
    }

    case "STORE_UNLOCK_SET_TILES": {
      // console.log("UNLOCK_SET_TILES");
      const { level, difficulty } = action.payload;

      const newState = {
        ...state,
        tilesSets: state.tilesSets.map((tileSet) =>
          tileSet.unlockedAt.level === level &&
          tileSet.unlockedAt.difficulty === difficulty &&
          !tileSet.isUnlocked
            ? { ...tileSet, isUnlocked: true }
            : tileSet
        ),
      };

      saveStateToStorage(STORAGE_STORE_STATE_KEY, newState);
      return newState;
    }

    case "STORE_SET_CURRENT_TILESET": {
      // console.log("SET_CURRENT_TILESET");
      const newState = {
        ...state,
        tilesSets: state.tilesSets.map((tileSet) => {
          const isCurrentSet = tileSet.id === action.payload;
          return {
            ...tileSet,
            isCurrentlyUsed: isCurrentSet,
          };
        }),
      };

      saveStateToStorage(STORAGE_STORE_STATE_KEY, newState);
      return newState;
    }

    case "STORE_SET_WALLPAPER": {
      console.log("SET_WALLPAPERS");
      const newState = {
        ...state,
        tilesSets: state.tilesSets.map((tileSet) =>
          tileSet.id === action.payload.setId
            ? {
                ...tileSet,
                wallpapers: tileSet.wallpapers.map((wallpaper) =>
                  wallpaper.id === action.payload.wallpaperId
                    ? {
                        ...wallpaper,
                        isDownloaded: true,
                        fileUri: action.payload.fileUri,
                      }
                    : wallpaper
                ),
              }
            : tileSet
        ),
      };

      saveStateToStorage(STORAGE_STORE_STATE_KEY, newState);
      return newState;
    }

    case "STORE_BUY_WALLPAPER": {
      const { setId, wallpaperId } = action.payload;
      const newState = {
        ...state,
        wallpaperModal: false,
        tilesSets: state.tilesSets.map((tileSet) =>
          tileSet.id === setId
            ? {
                ...tileSet,
                wallpapers: tileSet.wallpapers.map((wallpaper) =>
                  wallpaper.id === wallpaperId
                    ? {
                        ...wallpaper,
                        isUnlocked: true,
                      }
                    : wallpaper
                ),
              }
            : tileSet
        ),
      };

      saveStateToStorage(STORAGE_STORE_STATE_KEY, newState);
      return newState;
    }

    case "STORE_RESET_STATE": {
      // console.log("RESET_STORE_STATE");
      saveStateToStorage(STORAGE_STORE_STATE_KEY, initialState);
      return initialState;
    }

    default:
      return state;
  }
};

function StoreProvider({ children }: StoreContextProviderProps) {
  // console.log("storeProvider");
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

function useStoreContext(): StoreContextType {
  // console.log("useStoreContext");
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
}

export { StoreProvider, useStoreContext };
