import useHideAndroidNavigationBar from "./useHideAndroidNavigationBar";
import useLoadGameContent from "./useLoadGameContent";

/**
 * Custom hook that performs initial setup actions when the app starts.
 *
 * This hook hides the Android navigation bar, loads game content including
 * tiles and game state.
 *
 * It ensures that the app is ready for user interaction immediately
 * upon launch by setting the required game states and UI configurations.
 */
export default function useLoadOnAppStart() {
  // console.log("useLoadOnAppStart");

  // Hide navigation bar on app start
  useHideAndroidNavigationBar();

  // Loads tiles and game state on app start
  useLoadGameContent();
}
