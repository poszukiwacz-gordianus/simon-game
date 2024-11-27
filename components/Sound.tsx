import { useGameContext } from "@/context/GameContext";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function Sound() {
  const {
    state: { isSoundOn, isPlaying },
    dispatch,
  } = useGameContext();

  return (
    <Pressable
      style={styles.sound}
      onPress={() => dispatch({ type: "TOGGLE_SOUND" })}
      disabled={!isPlaying}
    >
      {isSoundOn ? (
        <Ionicons
          name="volume-high"
          size={48}
          color={!isPlaying ? "#755224" : "#FCFCF7"}
        />
      ) : (
        <Ionicons name="volume-mute" size={48} color="#755224" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sound: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
