import { START_LEVEL_DELAY } from "@/config";
import { type Action } from "@/types/types";

export function startLevel(
  level: number,
  animationPace: number,
  dispatch: React.Dispatch<Action>
) {
  // Dispatch the startLevel action
  dispatch({ type: "startLevel", payload: level });

  // Schedule the startPlay action
  setTimeout(
    () => dispatch({ type: "startPlay" }),
    level * animationPace + START_LEVEL_DELAY
  );
}
