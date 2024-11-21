import { useGameContext } from "@/context/GameContext";
import { type TileProps } from "@/types/types";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

export default function Tile({ color, opacity }: TileProps) {
  const {
    state: { isPlaying, tiles },
    dispatch,
  } = useGameContext();

  const tileNumber = tiles.findIndex((tile) => tile.color === color);

  return (
    <TouchableOpacity
      style={styles.tileContainer}
      disabled={!isPlaying}
      onPress={() => {
        dispatch({ type: "verifyUserResponse", payload: tileNumber });
      }}
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
  },
  tile: {
    width: "100%",
    height: "100%",
  },
});
