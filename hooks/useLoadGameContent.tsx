import { useEffect } from "react";
import { useAnimatedValue } from "react-native";
import {
  DEFAULT_BEST_SCORE,
  DEFAULT_DIFFICULTIES,
  GAME_OVER_SOUND,
} from "@/config";
import { useGameContext } from "@/context/GameContext";
import { loadGameStateFromStorage } from "@/utils/helpers";
import usePlaySound from "./usePlaySound";

import tilesClassic from "@/assets/images/tiles/tilesClassic";
import tilesTrees from "@/assets/images/tiles/tilesTrees";

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
  const { playSound } = usePlaySound();

  const tiles = Object.values(tilesTrees).map((source) => ({
    source,
    opacity: useAnimatedValue(1),
  }));

  useEffect(() => {
    const loadGameContent = async () => {
      if (!playSound) {
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
          tileSound: playSound,
          gameOverSound: () => playSound(GAME_OVER_SOUND),
        },
      });
    };

    loadGameContent();
  }, [playSound]);
}
