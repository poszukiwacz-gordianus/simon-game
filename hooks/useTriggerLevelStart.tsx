import { useEffect } from "react";

export default function useTriggerLevelStart(
  newLevel: number,
  levelUp: boolean,
  initializeLevelSequence: (newLevel: number) => void
) {
  console.log("useTriggerLevelStart");

  useEffect(() => {
    if (levelUp) initializeLevelSequence(newLevel);
  }, [levelUp]);
}
