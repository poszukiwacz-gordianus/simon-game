import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import FontText from "./FontText";
import Checkbox from "./Checkbox";
import Modal from "./Modal";

const checkboxes = [
  { sound: 0, label: "cartoon" },
  { sound: 1, label: "ufo" },
  { sound: 2, label: "laser" },
  { sound: 3, label: "spring" },
];

export default function SoundSettings({ onClose }: { onClose: () => void }) {
  const {
    state: { isSoundOn },
    dispatch,
  } = useGameContext();

  return (
    <Modal onClose={onClose}>
      <FontText style={styles.header}>Settings</FontText>
      <View
        style={{
          gap: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 10,
          }}
        >
          <FontText style={styles.subHeader}>Sound</FontText>
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  settings: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#FEF2BF",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 48,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 32,
  },
});
