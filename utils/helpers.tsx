import { START_LEVEL_DELAY } from "@/config";
import { type Action } from "@/types/types";

export function startLevel(
  level: number,
  animationPace: number,
  dispatch: React.Dispatch<Action>
) {
  // Dispatch the startLevel action
  setTimeout(() => dispatch({ type: "startLevel", payload: level }), 600);

  // Schedule the startPlay action
  setTimeout(
    () => dispatch({ type: "startPlay" }),
    level * animationPace + START_LEVEL_DELAY
  );
}
