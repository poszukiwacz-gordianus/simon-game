import { type Action } from "@/types/types";
import { startLevel } from "@/utils/helpers";
import { useEffect } from "react";

export default function useStartLevel(
  level: number,
  levelUp: boolean,
  animationPace: number,
  dispatch: React.Dispatch<Action>
) {
  useEffect(() => {
    if (levelUp) {
      startLevel(level, animationPace, dispatch);
    }
  }, [levelUp]);
}
