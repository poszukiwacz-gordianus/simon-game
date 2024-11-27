import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import FontText from "./FontText";
import Checkbox from "./Checkbox";
import { useGameContext } from "@/context/GameContext";

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
    <Pressable style={styles.centeredView} onPress={onClose}>
      <Animated.View
        entering={BounceIn}
        exiting={BounceOut}
        style={styles.centeredView}
      >
        <Pressable
          style={styles.modalView}
          onPress={(e) => e.stopPropagation()}
        >
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
        </Pressable>
      </Animated.View>
    </Pressable>
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
  centeredView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalView: {
    backgroundColor: "#FEF2BF",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 48,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 32,
  },
});
