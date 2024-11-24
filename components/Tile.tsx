import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { useGameContext } from "@/context/GameContext";
import { AnimatedTile } from "@/types";

export default function Tile({ color, opacity }: AnimatedTile) {
  const {
    state: { isPlaying, tiles },
    dispatch,
  } = useGameContext();

  const tileIndex = tiles.findIndex((tile) => tile.color === color);

  return (
    <TouchableOpacity
      style={styles.tileContainer}
      disabled={!isPlaying}
      onPress={() =>
        dispatch({ type: "VERIFY_USER_RESPONSE", payload: tileIndex })
      }
    >
      <Animated.View
        style={[styles.tile, { backgroundColor: color, opacity }]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tileContainer: {
    width: "50%",
    height: "50%",
    padding: 5,
  },
  tile: {
    width: "100%",
    height: "100%",
  },
});
