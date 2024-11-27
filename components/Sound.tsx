import { useGameContext } from "@/context/GameContext";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function Sound() {
  const {
    state: { isSoundOn },
    dispatch,
  } = useGameContext();

  return (
    <Pressable
      style={styles.sound}
      onPress={() => dispatch({ type: "TOGGLE_SOUND" })}
    >
      {isSoundOn ? (
        <Ionicons name="volume-high" size={24} color="black" />
      ) : (
        <Ionicons name="volume-mute" size={24} color="black" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sound: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FEF2BF",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
