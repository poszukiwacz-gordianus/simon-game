import { useState } from "react";
import { Pressable, StyleSheet, View, useAnimatedValue } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useGameContext } from "@/context/GameContext";
import { useStoreContext } from "@/context/StoreContext";
import FontText from "@/components/UI/FontText";
import Modal from "@/components/UI/Modal";
import tilesClassic from "@/assets/images/tiles/tilesClassic";

export default function ResetAppSettings() {
  const [isVisible, setIsVisible] = useState(false);
  const { dispatch: gameDispatch } = useGameContext();
  const { dispatch: storeDispatch } = useStoreContext();

  const defaultTiles = tilesClassic.map((source) => ({
    source,
    opacity: useAnimatedValue(1),
  }));

  const handleResetData = () => {
    setIsVisible(false);
    gameDispatch({ type: "RESET_APP_STATE" });
    storeDispatch({ type: "RESET_STORE_STATE" });
    gameDispatch({ type: "SET_TILES", payload: defaultTiles });
  };

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
              score, level progress, and unlocked tiles.
            </FontText>
            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setIsVisible(false)}
                style={[styles.actionButton, styles.cancelButton]}
              >
                <FontText style={styles.buttonText}>Cancel</FontText>
              </Pressable>
              <Pressable
                onPress={handleResetData}
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
