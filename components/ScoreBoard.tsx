import { useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { DEFAULT_MAX_LEVELS } from "@/config";
import { useGameContext } from "@/context/GameContext";
import Modal from "./Modal";
import FontText from "./FontText";

export default function ScoreBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    state: { bestScore, difficulties },
  } = useGameContext();

  return (
    <>
      <Pressable
        style={styles.scoreBoardButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <FontAwesome name="trophy" size={24} color="#000" />
      </Pressable>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <View style={styles.modalContent}>
            <FontText style={styles.header}>Scoreboard</FontText>
            <FontText style={styles.bestScoreText}>
              Best Score:{" "}
              <FontText style={styles.highlight}>{bestScore}</FontText>
            </FontText>

            <FontText style={styles.header}>Level Progress</FontText>
            {Object.entries(difficulties).map(
              ([difficultyKey, difficultyValue], index) => (
                <FontText style={styles.progressText} key={index}>
                  {`${
                    difficultyKey.charAt(0).toUpperCase() +
                    difficultyKey.slice(1)
                  }: `}
                  {difficultyValue.level === DEFAULT_MAX_LEVELS
                    ? "Completed"
                    : `${difficultyValue.level}/${DEFAULT_MAX_LEVELS}`}
                </FontText>
              )
            )}
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scoreBoardButton: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "#FEF2BF",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    gap: 20,
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  bestScoreText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#444",
  },
  progressText: {
    fontSize: 18,
    color: "#333",
  },
  highlight: {
    fontWeight: "bold",
    color: "#da1f1f",
  },
});
