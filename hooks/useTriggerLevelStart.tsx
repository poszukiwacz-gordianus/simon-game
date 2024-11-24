import { useEffect } from "react";
import { useGameContext } from "@/context/GameContext";
import useInitializeLevelSequence from "./useInitializeLevelSequence";

/**
 * Custom hook that triggers the start of the next game level if the user has
 * completed the current level.
 *
 * This hook uses the `useGameContext` hook to access the game state and
 * the `useInitializeLevelSequence` hook to initialize the new level's state.
 *
 * It listens for changes in the game state's `levelUp` property and triggers
 * the start of the new level when the user has completed the current level.
 */
export default function useTriggerLevelStart() {
  const {
    state: { levelUp, level },
  } = useGameContext();
  const { initializeLevelSequence } = useInitializeLevelSequence();

  useEffect(() => {
    if (levelUp) initializeLevelSequence(level + 1);
  }, [levelUp]);
}
