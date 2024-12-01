import { START_LEVEL_DELAY, USER_RESPONSE_DELAY } from "@/config";
import { GameState } from "@/types/types";

/**
 * Custom hook to initialize and manage the sequence of levels in the game.
 *
 * This hook provides a function to initialize the state for a new game level,
 * showing the sequence of tiles with an appropriate delay based on the game's
 * difficulty and enabling user response after the sequence has been displayed.
 *
 * The delay for showing the sequence is adjusted for "easy" difficulty levels.
 * It dispatches actions to update the game state, show the tile sequence, and
 * enable user interaction.
 *
 * @returns An object containing the `initializeLevelSequence` function.
 */
export default function useInitializeLevelSequence(
  state: GameState,
  dispatch: React.Dispatch<any>
) {
  console.log("useInitializeLevelSequence");
  const { animationPace, difficulty } = state;

  const delay =
    difficulty === "easy" ? START_LEVEL_DELAY - 200 : START_LEVEL_DELAY;

  /**
   * Initializes the state for a new game level, shows the sequence of tiles with
   * an appropriate delay based on the game's difficulty, and enables user response
   * after the sequence has been displayed.
   *
   * @param {number} newLevel The new level to initialize.
   */
  const initializeLevelSequence = (newLevel: number) => {
    // Load level state
    dispatch({
      type: "INITIALIZE_LEVEL",
      payload: newLevel,
    });

    // Show sequence to user after a delay
    setTimeout(() => dispatch({ type: "SHOW_SEQUENCE" }), delay);

    // Enable user response after all tiles are shown
    setTimeout(
      () => dispatch({ type: "ENABLE_USER_RESPONSE" }),
      newLevel * animationPace + USER_RESPONSE_DELAY
    );
  };

  return { initializeLevelSequence };
}
