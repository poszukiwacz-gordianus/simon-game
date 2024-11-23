import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

import { DifficultyChoice, Rules } from "@/components/Components";

export default function Index() {
  useEffect(() => {
    // Hide the navigation bar
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Rules />
      <DifficultyChoice />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#437214",
  },
});
