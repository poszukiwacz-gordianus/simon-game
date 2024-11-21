import { StyleSheet, View } from "react-native";

import Tile from "./Tile";
import { type TilesContainerProps } from "@/types/types";

export default function TilesContainer({
  tiles,
  isPlaying,
}: TilesContainerProps) {
  return (
    <View style={styles.tilesContainer}>
      {tiles.map(({ color, tile }, index) => (
        <Tile key={index} color={color} tile={tile} isPlaying={isPlaying} />
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
