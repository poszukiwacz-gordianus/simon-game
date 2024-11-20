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

  const blueSquare = useAnimatedValue(1);
  const yellowSquare = useAnimatedValue(1);
  const redSquare = useAnimatedValue(1);
  const whiteSquare = useAnimatedValue(1);

  const tiles = [
    { color: "blue", square: blueSquare },
    { color: "yellow", square: yellowSquare },
    { color: "red", square: redSquare },
    { color: "white", square: whiteSquare },
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
            animateTile(blueSquare);
            break;
          case 1:
            animateTile(yellowSquare);
            break;
          case 2:
            animateTile(redSquare);
            break;
          default:
            animateTile(whiteSquare);
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
