import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { useGameContext } from "@/context/GameContext";
import { type TileProps } from "@/types/types";

export default function Tile({ color, opacity }: TileProps) {
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
        dispatch({ type: "verifyUserResponse", payload: tileIndex })
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
