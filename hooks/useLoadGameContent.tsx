import { useEffect, useRef } from "react";
import { useAnimatedValue } from "react-native";
import { DEFAULT_BEST_SCORE, DEFAULT_DIFFICULTIES } from "@/config";
import { useGameContext } from "@/context/GameContext";
import { useStoreContext } from "@/context/StoreContext";
import {
  loadSoundsToMemory,
  loadStateFromStorage,
  loadTiles,
} from "@/utils/helpers";

import tilesClassic from "@/assets/images/tiles/tilesClassic";

export default function useLoadGameContent() {
  console.log("useLoadGameContent");
  const { dispatch: gameDispatch } = useGameContext();
  const { state: storeState, dispatch: storeDispatch } = useStoreContext();

  // Shared timeout refs to track tile animations to stop them
  const timeoutRefs = useRef<number[]>([]);

  // Load default tiles
  const defaultTiles = tilesClassic.map((source) => ({
    source,
    opacity: useAnimatedValue(1),
  }));

  useEffect(() => {
    const loadGameContent = async () => {
      // Load game sounds
      const tilesSounds = await loadSoundsToMemory();

      // Load saved game state from storage
      await loadStateFromStorage("gameState", gameDispatch, "GAME_LOAD_STATE", {
        bestScore: DEFAULT_BEST_SCORE,
        difficulties: DEFAULT_DIFFICULTIES,
      });

      // Load saved store state from storage and return loaded state
      const loadedStoreState = await loadStateFromStorage(
        "storeState",
        storeDispatch,
        "STORE_LOAD_STATE",
        storeState
      );

      // Load starting game content
      gameDispatch({
        type: "GAME_LOAD_CONTENT",
        payload: {
          // Checks which tiles are used by user and return the corresponding tiles set
          tiles: loadTiles(loadedStoreState, defaultTiles),
          tilesSounds,
          timeoutRefs,
        },
      });
    };

    loadGameContent();
  }, []);
}
