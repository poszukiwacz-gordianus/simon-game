import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  type Difficulties,
  type SaveGameStateToStorageProps,
  type LoadGameStateFromStorageProps,
  type AnimatedTileProps,
  type GenerateTileSequenceProps,
  type StopTilesAnimationProps,
} from "@/types";

export const animateTile: AnimatedTileProps = (tileOpacity, pace) => {
  // Animate tile opacity
  Animated.sequence([
    Animated.timing(tileOpacity, {
      toValue: 0.1,
      duration: pace / 2,
      useNativeDriver: true,
    }),
    Animated.timing(tileOpacity, {
      toValue: 1,
      duration: pace / 2,
      useNativeDriver: true,
    }),
  ]).start();
};

export const generateTileSequence: GenerateTileSequenceProps = (
  length,
  prevSequence,
  tiles,
  animationPace
) => {
  return Array.from({ length }, (_, index) => {
    const sequenceItem =
      index >= prevSequence.length
        ? Math.floor(Math.random() * 4)
        : prevSequence[index];

    // Set the timeout and store its ID
    setTimeout(() => {
      animateTile(tiles[sequenceItem].opacity, animationPace);
    }, animationPace * (index + 1));

    return sequenceItem;
  });
};

export const saveGameStateToStorage: SaveGameStateToStorageProps = async (
  key,
  difficulties
) => {
  // Save game state
  try {
    await AsyncStorage.setItem(key, JSON.stringify(difficulties));
  } catch (e) {
    console.error("Failed to save game state", e);
  }
};

export const loadGameStateFromStorage: LoadGameStateFromStorageProps = async (
  key,
  dispatch,
  defaultState
) => {
  // Load game state from storage
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    const loadedDifficulties: Difficulties = jsonValue
      ? JSON.parse(jsonValue)
      : defaultState;

    dispatch({
      type: "LOAD_GAME_STATE",
      payload: loadedDifficulties,
    });
  } catch (e) {
    console.error("Failed to load game state", e);
  }
};

export const stopTilesAnimation: StopTilesAnimationProps = (ref, tiles) => {
  // Clear all animation timeouts
  ref.current.forEach((timeoutId) => clearTimeout(timeoutId));
  ref.current = []; // Reset timeouts

  // Reset all tile opacities
  tiles.forEach((tile) => tile.opacity.resetAnimation());
};
