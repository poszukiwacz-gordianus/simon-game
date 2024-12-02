import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { useGameContext } from "@/context/GameContext";
import FontText from "./FontText";

export default function Checkbox({
  sound,
  label,
}: {
  sound: number;
  label: string;
}) {
  const {
    state: { isSoundOn, tileSoundIndex },
    dispatch,
  } = useGameContext();
  const checked = sound === tileSoundIndex;

  return (
    <Pressable
      role="checkbox"
      aria-checked={checked}
      disabled={!isSoundOn}
      style={styles.checkboxContainer}
      onPress={() => {
        dispatch({ type: "GAME_SET_SOUND_INDEX", payload: sound });
      }}
    >
      {checked ? (
        <Ionicons
          name="radio-button-on"
          size={32}
          color="#000"
          style={!isSoundOn && { opacity: 0.5 }}
        />
      ) : (
        <Ionicons
          name="radio-button-off"
          size={32}
          color="#000"
          style={!isSoundOn && { opacity: 0.5 }}
        />
      )}
      <FontText style={[styles.checkboxLabel, !isSoundOn && { opacity: 0.5 }]}>
        {label}
      </FontText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: "500",
    fontSize: 18,
  },
});
