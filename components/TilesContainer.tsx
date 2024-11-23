import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameContext } from "@/context/GameContext";
import Tile from "./Tile";

export default function TilesContainer() {
  const {
    state: { tiles },
  } = useGameContext();

  return (
    <SafeAreaView style={styles.tilesContainer}>
      {tiles.map((tile, index) => (
        <Tile key={index} {...tile} />
      ))}
    </SafeAreaView>
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
