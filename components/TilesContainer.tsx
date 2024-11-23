import { StyleSheet, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import Tile from "./Tile";

export default function TilesContainer() {
  const {
    state: { tiles },
  } = useGameContext();

  return (
    <View style={styles.tilesContainer}>
      {tiles.map((tile, index) => (
        <Tile key={index} {...tile} />
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
  },
});
