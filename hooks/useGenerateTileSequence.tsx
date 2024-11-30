import { animateTile } from "@/utils/helpers";
import { GameState } from "@/types/types";

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
  console.log("useGenerateTileSequence");
  /**
   * Generates a sequence of tile indices for the current game level and animates them.
   *
   * This function creates a new sequence of tile indices, either using the previous sequence
   * or generating new indices. It animates the tiles in the sequence with a delay determined
   * by the animation pace.
   *
   * @returns An array of numbers representing the sequence of tile indices.
   */
  const generateTileSequence = (state: GameState) => {
    console.log("generateTileSequence");
    const {
      level: length,
      sequence: prevSequence,
      tiles,
      animationPace,
      tileSound,
      tileSoundIndex,
      isSoundOn,
      isInfiniteMode,
      timeoutRefs,
    } = state;

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
          console.log("Animating tile and Play sound");
          // Play sound asynchronously
          if (isSoundOn) tileSound(tileSoundIndex);

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
