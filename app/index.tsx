import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

import DifficultyChoice from "@/components/DifficultyChoice";
import Rules from "@/components/Rules";

export default function Index() {
  useEffect(() => {
    // Hide the navigation bar
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  return (
    <View style={styles.container}>
      <Rules />
      <DifficultyChoice />
    </View>
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
