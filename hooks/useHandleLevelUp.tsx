import { useGameContext } from "@/context/GameContext";
import { useStoreContext } from "@/context/StoreContext";
import { useEffect } from "react";
import useInitializeLevelSequence from "./useInitializeLevelSequence";

export default function useHandleLevelUp() {
  // console.log("useHandleLevelUp");
  const { initializeLevelSequence } = useInitializeLevelSequence();
  const {
    state: { level, levelUp, difficulty, isInfiniteMode, animationPace },
  } = useGameContext();
  const { dispatch: storeDispatch } = useStoreContext();

  const newLevel = level + 1;

  useEffect(() => {
    if (levelUp) {
      // Send dispatch action if level is 10, 20, or 30, and it's not in infinite mode
      const unlockLevel = [10, 20, 30, 40].includes(newLevel);
      if (!isInfiniteMode && unlockLevel) {
        storeDispatch({
          type: "STORE_UNLOCK_SET_TILES",
          payload: { difficulty, level: newLevel },
        });
      }

      // Starting new level
      initializeLevelSequence(newLevel, animationPace);
    }
  }, [levelUp]);
}
