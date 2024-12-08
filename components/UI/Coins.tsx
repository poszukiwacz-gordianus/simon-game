import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { useGameContext } from "@/context/GameContext";
import { FontAwesome6 } from "@expo/vector-icons";
import FontText from "./FontText";
import { Colors } from "@/constants/Colors";
import Modal from "./Modal";

export default function Coins() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    state: { coins },
  } = useGameContext();

  return (
    <>
      <Pressable style={styles.container} onPress={() => setIsOpen(!isOpen)}>
        <FontAwesome6 name="coins" size={42} color={Colors.buttonPrimary} />
        <FontText style={styles.coins}>{coins}</FontText>
      </Pressable>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <View style={styles.modalContent}></View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 30,
    left: 35,
    zIndex: 10,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  coins: {
    position: "absolute",
    top: 5,
    left: 50,
    fontSize: 20,
  },
  modalContent: {
    gap: 20,
    alignItems: "center",
    padding: 20,
  },
});
