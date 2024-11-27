import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import SoundSettings from "./SoundSettings";

export default function Settings() {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  return (
    <>
      <Pressable
        style={styles.settings}
        onPress={() => setIsSettingsVisible(!isSettingsVisible)}
      >
        <Ionicons name="settings" size={24} color="black" />
      </Pressable>
      {isSettingsVisible && (
        <SoundSettings onClose={() => setIsSettingsVisible(false)} />
      )}
    </>
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
});
