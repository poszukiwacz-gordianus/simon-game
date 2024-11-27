import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function Sound() {
  return (
    <Pressable style={styles.sound}>
      <Ionicons name="volume-medium" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sound: {
    position: "absolute", // Position the info button
    bottom: 20,
    right: 20,
    backgroundColor: "#FEF2BF",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
