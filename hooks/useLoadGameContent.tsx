import { useEffect, useRef } from "react";
import { useAnimatedValue } from "react-native";
import { DEFAULT_BEST_SCORE, DEFAULT_DIFFICULTIES } from "@/config";
import { useGameContext } from "@/context/GameContext";
import { useStoreContext } from "@/context/StoreContext";
import { loadStateFromStorage, loadTiles } from "@/utils/helpers";

import tilesClassic from "@/assets/images/tiles/tilesClassic";
import useLoadSoundsToMemory from "./useLoadSoundsToMemory";

export default function useLoadGameContent() {
  console.log("useLoadGameContent");
  const { dispatch: gameDispatch } = useGameContext();
  const { state: storeState, dispatch: storeDispatch } = useStoreContext();

  // Loads sounds to memory and returns an array of Audio.Sound
  const { tilesSounds, isLoading } = useLoadSoundsToMemory();

  // Shared timeout refs to track tile animations to stop them
  const timeoutRefs = useRef<number[]>([]);

  // Load default tiles
  const defaultTiles = tilesClassic.map((source) => ({
    source,
    opacity: useAnimatedValue(1),
  }));

  useEffect(() => {
    const loadGameContent = async () => {
      if (isLoading) {
        console.log("Waiting for sounds to load...");
        return; // Exit early until sounds are loaded
      }

      // Load saved game state from storage
      await loadStateFromStorage("gameState", gameDispatch, "LOAD_GAME_STATE", {
        bestScore: DEFAULT_BEST_SCORE,
        difficulties: DEFAULT_DIFFICULTIES,
      });

      // Load saved store state from storage and return loaded state
      const loadedStoreState = await loadStateFromStorage(
        "storeState",
        storeDispatch,
        "LOAD_STORE_STATE",
        storeState
      );

      // Load starting game content
      gameDispatch({
        type: "LOAD_DEFAULT_CONTENT",
        payload: {
          // Checks which tiles are used by user and return the corresponding tiles set
          tiles: loadTiles(loadedStoreState, defaultTiles),
          tilesSounds,
          timeoutRefs,
        },
      });
    };

    loadGameContent();
  }, [isLoading]);
}
