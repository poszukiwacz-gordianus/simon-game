import { useEffect, useRef } from "react";
import { useAnimatedValue } from "react-native";
import { DEFAULT_BEST_SCORE, DEFAULT_DIFFICULTIES } from "@/config";
import { useGameContext } from "@/context/GameContext";
import { loadGameStateFromStorage } from "@/utils/helpers";

import tilesClassic from "@/assets/images/tiles/tilesClassic";
import tilesTrees from "@/assets/images/tiles/tilesTrees";
import useLoadSoundsToMemory from "./useLoadSoundsToMemory";

/**
 * Loads the game content and the game state from storage when the component mounts.
 *
 * This hook loads the game content, such as the tiles, tile sound, game over sound, and the game state, such as
 * the difficulty level, from storage. It dispatches actions to update the game
 * state with the loaded content and state.
 */
export default function useLoadGameContent() {
  console.log("useLoadGameContent");
  const { dispatch } = useGameContext();
  const { tilesSounds, isLoading } = useLoadSoundsToMemory();
  const timeoutRefs = useRef<number[]>([]); // Shared timeout refs for all tiles

  const tiles = Object.values(tilesTrees).map((source) => ({
    source,
    opacity: useAnimatedValue(1),
  }));

  useEffect(() => {
    const loadGameContent = async () => {
      if (isLoading) {
        console.log("Waiting for sounds to load...");
        return; // Exit early until playSound is ready
      }

      loadGameStateFromStorage("gameState", dispatch, {
        bestScore: DEFAULT_BEST_SCORE,
        difficulties: DEFAULT_DIFFICULTIES,
      });

      dispatch({
        type: "LOAD_DEFAULT_CONTENT",
        payload: {
          tiles,
          tilesSounds,
          timeoutRefs,
        },
      });
    };

    loadGameContent();
  }, [isLoading]);
}
