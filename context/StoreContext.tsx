import tilesClassic from "@/assets/images/tiles/tilesClassic";
import tilesTrees from "@/assets/images/tiles/tilesTrees";
import {
  StoreContextProviderProps,
  StoreContextType,
  StoreReducer,
  StoreStateType,
} from "@/types/types";
import { saveGameStateToStorage } from "@/utils/helpers";
import { createContext, useContext, useReducer } from "react";

const StoreContext = createContext<StoreContextType | null>(null);

const initialState: StoreStateType = {
  tilesSets: [
    {
      setName: "Classic",
      id: 1,
      isUnlocked: true,
      isCurrentlyUsed: true,
      unlockedAt: { difficulty: "easy", level: 0 },
      tiles: tilesClassic,
    },
    {
      setName: "Trees",
      id: 2,
      isUnlocked: false,
      isCurrentlyUsed: false,
      unlockedAt: { difficulty: "easy", level: 10 },
      tiles: tilesTrees,
    },
  ],
  purchase: {
    setName: "",
    id: 0,
    setPrice: 1,
    allSetsPrice: 10,
    isModalOpen: false,
  },
};

const storeReducer: StoreReducer = (state, action) => {
  console.log("storeReducer");
  switch (action.type) {
    case "STORE_LOAD_STATE": {
      console.log("LOAD_STORE_STATE");
      if (action.payload) return action.payload;
      return state;
    }
    case "STORE_TOGGLE_MODAL":
      console.log("TOGGLE_MODAL");
      return {
        ...state,
        purchase: {
          ...state.purchase,
          isModalOpen: !state.purchase.isModalOpen,
        },
      };

    case "STORE_SET_PURCHASE": {
      console.log("SET_PURCHASE");
      const { id, setName } = action.payload;
      return {
        ...state,
        purchase: {
          ...state.purchase,
          isModalOpen: !state.purchase.isModalOpen,
          id,
          setName,
        },
      };
    }

    case "STORE_UNLOCK_SET_TILES": {
      console.log("UNLOCK_SET_TILES");
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

      saveGameStateToStorage("storeState", newState);
      return newState;
    }

    case "STORE_SET_CURRENT_TILESET": {
      console.log("SET_CURRENT_TILESET");
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

      console.log(state.tilesSets[0].tiles);
      console.log(tilesClassic);

      saveGameStateToStorage("storeState", newState);
      return newState;
    }

    case "STORE_RESET_STATE": {
      console.log("RESET_STORE_STATE");
      saveGameStateToStorage("storeState", initialState);
      return initialState;
    }

    default:
      return state;
  }
};

function StoreProvider({ children }: StoreContextProviderProps) {
  console.log("storeProvider");
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

function useStoreContext(): StoreContextType {
  console.log("useStoreContext");
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
}

export { StoreProvider, useStoreContext };
