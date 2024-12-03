import { StyleSheet, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import GameTile from "./GameTile";
import { Colors } from "@/constants/Colors";

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
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.backgroundTiles,
    padding: 2.5,
    justifyContent: "space-between",
    alignContent: "space-between",
  },
});
