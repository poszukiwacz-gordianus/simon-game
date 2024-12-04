import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import FontText from "@/components/UI/FontText";
import Checkbox from "@/components/UI/Checkbox";
import { Colors } from "@/constants/Colors";

// const checkboxes = [
//   { sound: 2, label: "bump" },
//   { sound: 3, label: "chime" },
//   { sound: 4, label: "click" },
//   { sound: 5, label: "metallic tap" },
//   { sound: 6, label: "whisk" },
//   { sound: 7, label: "whoosh" },
//   { sound: 8, label: "wood tap" },
// ];

export default function ManageSoundSettings() {
  const {
    state: { isSoundOn },
    dispatch,
  } = useGameContext();

  return (
    <>
      <View style={styles.container}>
        <FontText style={styles.header}>Sound</FontText>
        <Pressable onPress={() => dispatch({ type: "GAME_TOGGLE_SOUND" })}>
          {isSoundOn ? (
            <FontAwesome5 name="toggle-on" size={32} color={Colors.tint} />
          ) : (
            <FontAwesome5 name="toggle-off" size={32} color={Colors.tint} />
          )}
        </Pressable>
      </View>
      {/* <View>
        {checkboxes.map((checkbox) => (
          <Checkbox
            key={checkbox.label}
            label={checkbox.label}
            sound={checkbox.sound}
          />
        ))}
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header: {
    fontSize: 30,
  },
});
