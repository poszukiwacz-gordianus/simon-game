import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useGameContext } from "@/context/GameContext";
import { type AnimatedTile } from "@/types/types";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function GameTile({ source, opacity }: AnimatedTile) {
  const {
    state: { isPlaying, tiles },
    dispatch,
  } = useGameContext();

  const tileIndex = tiles.findIndex((tile) => tile.source === source);

  return (
    <TouchableOpacity
      style={styles.tileContainer}
      disabled={!isPlaying}
      onPress={() => {
        dispatch({ type: "VERIFY_USER_RESPONSE", payload: tileIndex });
      }}
    >
      <Animated.View style={{ opacity }}>
        <Image
          style={styles.image}
          source={source}
          placeholder={{ blurhash }}
          contentFit="fill"
          transition={1000}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tileContainer: {
    width: "50%",
    height: "50%",
    padding: 2.5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
