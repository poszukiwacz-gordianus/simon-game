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
        index >= prevSequence.length || isInfiniteMode
          ? Math.floor(Math.random() * tiles.length) // Ensure valid index range
          : prevSequence[index];

      // Set the timeout and store its ID
      const timeoutId = window.setTimeout(() => {
        if (isSoundOn) tileSound(tileSoundIndex);
        animateTile(tiles[sequenceItem].opacity, animationPace);
      }, animationPace * (index + 1));

      timeoutRefs.current.push(timeoutId); // Track the timeout ID
      return sequenceItem;
    });
  };

  return { generateTileSequence };
}
