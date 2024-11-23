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
      <DifficultyChoice />
      <Rules />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c2a664",
  },
});
