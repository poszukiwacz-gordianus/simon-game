import { type TileProps } from "@/types/types";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

export default function Tile({ color, tile, isPlaying }: TileProps) {
  return (
    <TouchableOpacity style={styles.tileContainer} disabled={!isPlaying}>
      <Animated.View
        style={[styles.tile, { backgroundColor: color, opacity: tile }]}
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
