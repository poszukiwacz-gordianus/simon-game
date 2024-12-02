import { StyleSheet, View } from "react-native";
import { type TileSet } from "@/types/types";
import StoreTile from "./StoreTile";
import StoreAside from "./StoreAside";

export default function StoreCard({ tileSet }: { tileSet: TileSet }) {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.tilesContainer,
          {
            opacity: tileSet.isUnlocked ? 1 : 0.4,
            backgroundColor: tileSet.isUnlocked ? "" : "rgb(0, 0, 0)",
          },
        ]}
      >
        {tileSet.tiles.map((tile, tileIndex) => (
          <StoreTile key={tileIndex} source={tile} />
        ))}
      </View>
      <StoreAside tileSet={tileSet} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "49%",
    height: 350,
    marginBottom: 20,
    overflow: "hidden",
    borderColor: "white",
    borderWidth: 1,
    position: "relative",
  },
  tilesContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
