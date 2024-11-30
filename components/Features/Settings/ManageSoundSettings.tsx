import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import FontText from "@/components/UI/FontText";
import Checkbox from "@/components/UI/Checkbox";

const checkboxes = [
  { sound: 0, label: "cartoon" },
  { sound: 1, label: "ufo" },
  { sound: 2, label: "laser" },
  { sound: 3, label: "spring" },
];

export default function ManageSoundSettings() {
  const {
    state: { isSoundOn },
    dispatch,
  } = useGameContext();

  return (
    <>
      <View style={styles.container}>
        <FontText style={styles.header}>Sound</FontText>
        <Pressable onPress={() => dispatch({ type: "TOGGLE_SOUND" })}>
          {isSoundOn ? (
            <FontAwesome5 name="toggle-on" size={32} color="#000" />
          ) : (
            <FontAwesome5 name="toggle-off" size={32} color="#000" />
          )}
        </Pressable>
      </View>
      <View>
        {checkboxes.map((checkbox) => (
          <Checkbox
            key={checkbox.label}
            label={checkbox.label}
            sound={checkbox.sound}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  header: {
    fontSize: 32,
  },
});
