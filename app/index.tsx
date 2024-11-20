import { StyleSheet, Text, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { rulesContent } from "@/content/content";
import Rule from "@/components/Rule";
import Button from "@/components/Button";

export default function Index() {
  useEffect(() => {
    // Hide the navigation bar
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rulesContainer}>
        <Text style={styles.header}>Rules</Text>
        {rulesContent.map((rule, index) => (
          <Rule rule={rule} index={index} key={rule} />
        ))}
      </View>
      <View style={styles.buttons}>
        <Button title="Easy" onPress={() => console.log("Easy")} />
        <Button title="Medium" onPress={() => console.log("Medium")} />
        <Button title="Hard" onPress={() => console.log("Hard")} />
      </View>
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
  rulesContainer: {
    width: "100%",
    padding: 40,
  },
  header: {
    color: "#FEF2BF",
    fontSize: 30,
    textAlign: "center",
  },
  buttons: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
});
