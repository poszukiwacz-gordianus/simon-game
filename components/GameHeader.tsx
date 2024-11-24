import { StyleSheet, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import FontText from "./FontText";

export default function GameHeader() {
  const {
    state: { level, tilesRemaining },
  } = useGameContext();

  return (
    <View style={styles.container}>
      <FontText style={styles.header}>Level {level}</FontText>
      <FontText style={styles.subHeader}>Remaining: {tilesRemaining}</FontText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  header: {
    fontSize: 30,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 15,
    textAlign: "center",
  },
});
