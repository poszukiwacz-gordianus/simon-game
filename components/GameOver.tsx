import { useGameContext } from "@/context/GameContext";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LevelUp() {
  const { dispatch } = useGameContext();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Game over 😥</Text>
      <Pressable
        style={[styles.buttonContainer, styles.nextLevel]}
        onPress={() => dispatch({ type: "resetLevel" })}
      >
        <Text style={styles.button}>Try again</Text>
      </Pressable>
      <Link href="/" style={[styles.buttonContainer, styles.home]}>
        <Text style={styles.button}>Home</Text>
      </Link>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
    marginBottom: 40,
  },
  buttonContainer: {
    padding: 20,
    width: 200,
    marginBottom: 10,
  },
  button: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  nextLevel: {
    backgroundColor: "#23d14c",
  },
  home: {
    backgroundColor: "#251055",
  },
});
