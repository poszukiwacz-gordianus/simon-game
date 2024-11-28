import { useEffect } from "react";
import { useAnimatedValue } from "react-native";
import {
  DEFAULT_BEST_SCORE,
  DEFAULT_DIFFICULTIES,
  GAME_OVER_SOUND,
} from "@/config";
import { useGameContext } from "@/context/GameContext";
import { loadGameStateFromStorage } from "@/utils/helpers";
import useSound from "./useSound";

/**
 * Loads the game content and the game state from storage when the component mounts.
 *
 * This hook loads the game content, such as the tiles, tile sound, game over sound, and the game state, such as
 * the difficulty level, from storage. It dispatches actions to update the game
 * state with the loaded content and state.
 */
export default function useLoadGameContent() {
  const { dispatch } = useGameContext();
  const { playSound } = useSound();

  const tiles = [
    { color: "blue", opacity: useAnimatedValue(1) },
    {
      color: "yellow",
      opacity: useAnimatedValue(1),
    },
    { color: "red", opacity: useAnimatedValue(1) },
    { color: "white", opacity: useAnimatedValue(1) },
  ];

  useEffect(() => {
    dispatch({
      type: "LOAD_DEFAULT_CONTENT",
      payload: {
        tiles,
        tileSound: playSound,
        gameOverSound: () => playSound(GAME_OVER_SOUND),
      },
    }),
      loadGameStateFromStorage("gameState", dispatch, {
        bestScore: DEFAULT_BEST_SCORE,
        difficulties: DEFAULT_DIFFICULTIES,
      });
  }, []);
}
