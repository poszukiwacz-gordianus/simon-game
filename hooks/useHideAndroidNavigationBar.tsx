import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

/**
 * A React hook that hides the navigation bar on Android when the component
 * it is used in mounts.
 *
 * This hook is a no-op on platforms other than Android.
 *
 * @returns {void} Nothing
 */
export default function useHideAndroidNavigationBar() {
  useEffect(() => {
    console.log("useHideNavigationBar");
    // Hide the navigation bar
    NavigationBar.setVisibilityAsync("hidden");
  }, []);
}
