import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import SoundSettings from "./SoundSettings";
import Modal from "./Modal";
import FontText from "./FontText";
import ResetAppSettings from "./ResetAppSettings";

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
        <Modal onClose={() => setIsSettingsVisible(false)}>
          <FontText style={styles.header}>Settings</FontText>
          <View
            style={{
              gap: 10,
            }}
          >
            <SoundSettings />
            <ResetAppSettings />
          </View>
        </Modal>
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
  header: {
    fontSize: 48,
    marginBottom: 20,
  },
});
