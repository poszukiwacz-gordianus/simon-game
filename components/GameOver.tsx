import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
import { useGameContext } from "@/context/GameContext";

export default function GameOver() {
  const { dispatch } = useGameContext();

  return (
    <Animated.View entering={BounceIn} style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.text}>"Game over 😥"</Text>
        <Pressable
          style={[styles.buttonContainer, { backgroundColor: "#23d14c" }]}
          onPress={() => dispatch({ type: "resetLevel" })}
        >
          <Text style={styles.button}>"Try again"</Text>
        </Pressable>
        <Link
          href="/"
          style={[styles.buttonContainer, { backgroundColor: "#251055" }]}
        >
          <Text style={styles.button}>Home</Text>
        </Link>
      </View>
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    zIndex: 10, // Ensure it overlays other elements
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ea2e2e",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});
