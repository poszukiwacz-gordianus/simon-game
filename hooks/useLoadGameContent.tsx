import { useEffect } from "react";
import { useAnimatedValue } from "react-native";
import { DEFAULT_DIFFICULTIES } from "@/config";
import { useGameContext } from "@/context/GameContext";
import { loadGameStateFromStorage } from "@/utils/helpers";

/**
 * Loads the game content and the game state from storage when the component mounts.
 *
 * This hook loads the game content, such as the tiles, and the game state, such as
 * the difficulty level, from storage. It dispatches actions to update the game
 * state with the loaded content and state.
 */
export default function useLoadGameContent() {
  const { dispatch } = useGameContext();

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
    dispatch({ type: "LOAD_TILES", payload: tiles }),
      loadGameStateFromStorage("gameState", dispatch, DEFAULT_DIFFICULTIES);
  }, []);
}
