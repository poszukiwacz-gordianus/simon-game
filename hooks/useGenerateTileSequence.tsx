import { animateTile } from "@/utils/helpers";
import { useGameContext } from "@/context/GameContext";

/**
 * Custom hook to generate a sequence of tile indices for the current game level.
 *
 * This hook provides a `generateTileSequence` function which generates a sequence
 * of tile indices based on the specified length, previous sequence, tiles, and
 * animation pace. It also animates the tiles in the sequence with a delay determined
 * by the animation pace.
 *
 * @returns An object containing the `generateTileSequence` function.
 */
export default function useGenerateTileSequence() {
  const {
    timeoutRefs,
    state: {
      sequence: prevSequence,
      tiles,
      animationPace,
      tileSound,
      tileSoundIndex,
      isSoundOn,
      isInfiniteMode,
    },
  } = useGameContext();

  /**
   * Generates a sequence of tile indices for the current game level and animates them.
   *
   * This function creates a new sequence of tile indices, either using the previous sequence
   * or generating new indices. It animates the tiles in the sequence with a delay determined
   * by the animation pace.
   *
   * @returns An array of numbers representing the sequence of tile indices.
   */
  const generateTileSequence = (length: number) => {
    return Array.from({ length }, (_, index) => {
      const sequenceItem =
        index >= prevSequence.length || (isInfiniteMode && length === 1)
          ? Math.floor(Math.random() * tiles.length) // Ensure valid index range
          : prevSequence[index];

      // Calculate the exact delay for this animation step
      const delay = animationPace * index;

      // Set the timeout and store its ID
      const timeoutId = window.setTimeout(async () => {
        try {
          if (isSoundOn) tileSound(tileSoundIndex); // Play sound asynchronously
          animateTile(tiles[sequenceItem].opacity, animationPace);
        } catch (error) {
          console.error("Error during animation or sound:", error);
        }
      }, delay);

      timeoutRefs.current.push(timeoutId); // Track the timeout ID
      return sequenceItem;
    });
  };

  return { generateTileSequence };
}
