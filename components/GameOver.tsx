import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useGameContext } from "@/context/GameContext";
import FontText from "./FontText";
import IconButton from "./IconButton";
import Modal from "./Modal";

export default function GameOver() {
  const {
    state: { level, bestScore, isInfiniteMode, isNewBestScore },
    initializeLevelSequence,
  } = useGameContext();

  if (isInfiniteMode)
    return (
      <Modal>
        <FontText style={styles.header}>
          {isNewBestScore ? "New best!" : "Game over"}
        </FontText>
        {isNewBestScore ? (
          <FontText style={styles.best}>{bestScore}</FontText>
        ) : (
          <>
            <FontText style={styles.text}>Your score: {level - 1}</FontText>
            <FontText style={styles.text}>Best score: {bestScore}</FontText>
          </>
        )}
        <View style={{ flexDirection: "row" }}>
          <IconButton onPress={() => initializeLevelSequence(1)}>
            <AntDesign name="reload1" size={48} color="#FCFCF7" />
          </IconButton>
          <IconButton onPress={() => router.navigate("/")}>
            <AntDesign name="home" size={48} color="#FCFCF7" />
          </IconButton>
        </View>
      </Modal>
    );

  return (
    <Modal>
      <FontText style={styles.header}>Game over</FontText>
      <View style={{ flexDirection: "row" }}>
        <IconButton onPress={() => initializeLevelSequence(level)}>
          <AntDesign name="reload1" size={48} color="#FCFCF7" />
        </IconButton>
        <IconButton onPress={() => router.navigate("/")}>
          <AntDesign name="home" size={48} color="#FCFCF7" />
        </IconButton>
      </View>
    </Modal>
  );
}

export const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  best: {
    fontSize: 40,
    marginBottom: 20,
  },
});
