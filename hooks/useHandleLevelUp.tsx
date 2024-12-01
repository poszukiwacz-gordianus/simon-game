import { useGameContext } from "@/context/GameContext";
import { useStoreContext } from "@/context/StoreContext";
import { useEffect } from "react";

export default function useHandleLevelUp() {
  console.log("useHandleLevelUp");
  const {
    state: { level, levelUp, difficulty, isInfiniteMode },
    initializeLevelSequence,
  } = useGameContext();
  const { dispatch: storeDispatch } = useStoreContext();

  const newLevel = level + 1;

  useEffect(() => {
    if (levelUp) {
      // Send dispatch action if level is 10, 20, 30, or 40 and it's not in infinite mode
      const unlockLevel = [10, 20, 30, 40].includes(newLevel);
      if (!isInfiniteMode && unlockLevel) {
        storeDispatch({
          type: "UNLOCK_SET_TILES",
          payload: { difficulty, level: newLevel },
        });
      }

      // Starting new level
      initializeLevelSequence(newLevel);
    }
  }, [levelUp]);
}
