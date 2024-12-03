import { useEffect } from "react";
import Animated, {
  BounceIn,
  BounceOut,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import GameMode from "../UI/GameMode";
import { Colors } from "@/constants/Colors";

const duration = 1500;

export default function Play() {
  const scale = useSharedValue<number>(1);

  useEffect(() => {
    // Animate scale from 1 to 1.5 and repeat
    scale.value = withRepeat(
      withTiming(1.1, { duration, easing: Easing.ease }), // Scale up
      -1, // Infinite repeat
      true // Alternate between 1 and 1.5
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GameMode isInfiniteMode={false}>
      <Animated.View entering={BounceIn} exiting={BounceOut}>
        <Animated.View style={animatedStyle}>
          <Ionicons name="play" size={300} color={Colors.buttonPrimary} />
        </Animated.View>
      </Animated.View>
    </GameMode>
  );
}
