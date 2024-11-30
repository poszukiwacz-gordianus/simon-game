import { StyleSheet, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import GameTile from "./GameTile";

export default function GameTilesContainer() {
  const {
    state: { tiles },
  } = useGameContext();

  return (
    <View style={styles.tilesContainer}>
      {tiles.map((tile, index) => (
        <GameTile key={index} {...tile} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tilesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    backgroundColor: "#AD8F51",
  },
});
