import { type TileProps } from "@/types/types";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

export default function Tile({ color, square, isPlaying }: TileProps) {
  return (
    <TouchableOpacity style={styles.square} disabled={!isPlaying}>
      <Animated.View
        style={[styles.tile, { backgroundColor: color, opacity: square }]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: "100%",
    height: "100%",
  },
  square: {
    width: "50%",
    height: "50%",
  },
});
