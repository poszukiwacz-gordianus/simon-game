import GameFooter from "@/components/GameFooter";
import GameHeader from "@/components/GameHeader";
import TilesContainer from "@/components/TilesContainer";
import { useSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { StyleSheet, View, Animated, useAnimatedValue } from "react-native";

export default function Game() {
  const params = useSearchParams();
  const level = Number(params.get("level"));
  const [isPlaying, setIsPlaying] = useState(false);

  const blueTile = useAnimatedValue(1);
  const yellowTile = useAnimatedValue(1);
  const redTile = useAnimatedValue(1);
  const whiteTile = useAnimatedValue(1);

  const tiles = [
    { color: "blue", tile: blueTile },
    { color: "yellow", tile: yellowTile },
    { color: "red", tile: redTile },
    { color: "white", tile: whiteTile },
  ];

  const animateTile = (animatedValue: Animated.Value) => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const showSequence = () => {
    for (let index = 1; index <= level; index++) {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * 4);
        switch (randomIndex) {
          case 0:
            animateTile(blueTile);
            break;
          case 1:
            animateTile(yellowTile);
            break;
          case 2:
            animateTile(redTile);
            break;
          default:
            animateTile(whiteTile);
            break;
        }
      }, 500 * index);
    }
    setIsPlaying(true);
  };

  return (
    <View style={styles.container}>
      <GameHeader level={level} />
      <TilesContainer tiles={tiles} isPlaying={isPlaying} />
      <GameFooter showSequence={showSequence} isPlaying={isPlaying} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#437214",
  },
});
