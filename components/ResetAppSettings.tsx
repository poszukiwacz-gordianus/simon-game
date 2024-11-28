import { Pressable, StyleSheet, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import FontText from "./FontText";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "./Modal";

export default function ResetAppSettings() {
  const [isVisible, setIsVisible] = useState(false);
  const { dispatch } = useGameContext();

  return (
    <>
      <View style={styles.container}>
        <FontText style={styles.header}>Reset Data</FontText>
        <Pressable onPress={() => setIsVisible(true)}>
          <AntDesign name="delete" size={32} color="#da1f1f" />
        </Pressable>
      </View>
      {isVisible && (
        <Modal onClose={() => setIsVisible(false)}>
          <View style={styles.modalContent}>
            <FontText style={styles.modalText}>
              Are you sure you want to reset all data? This action will restore
              the application to its default state. You will lose your best
              score, level progress, and downloaded tiles.
            </FontText>
            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setIsVisible(false)}
                style={[styles.actionButton, styles.cancelButton]}
              >
                <FontText style={styles.buttonText}>Cancel</FontText>
              </Pressable>
              <Pressable
                onPress={() => {
                  setIsVisible(false);
                  dispatch({ type: "RESET_APP_STATE" });
                }}
                style={[styles.actionButton, styles.deleteButton]}
              >
                <FontText style={styles.buttonText}>Delete</FontText>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
  },
  modalContent: {
    width: 300,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  actionButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "green",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
