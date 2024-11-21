import { StyleSheet, View } from "react-native";

import Tile from "./Tile";
import { useGameContext } from "@/context/GameContext";

export default function TilesContainer() {
  const {
    state: { tiles },
  } = useGameContext();

  return (
    <View style={styles.tilesContainer}>
      {tiles.map(({ color, opacity }, index) => (
        <Tile key={index} color={color} opacity={opacity} />
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
