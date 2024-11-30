import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  type SaveGameStateToStorageProps,
  type LoadGameStateFromStorageProps,
  type AnimatedTileProps,
  type StopTilesAnimationProps,
  type LoadGameState,
  GameState,
} from "@/types/types";
import { DEFAULT_TILE_SOUND_INDEX } from "@/config";
import { Audio } from "expo-av";

export const animateTile: AnimatedTileProps = (tileOpacity, pace) => {
  console.log("animateTile");
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

export const saveGameStateToStorage: SaveGameStateToStorageProps = async (
  key,
  gameState
) => {
  console.log("saveGameStateToStorage");
  // Save game state
  try {
    await AsyncStorage.setItem(key, JSON.stringify(gameState));
  } catch (e) {
    console.error("Failed to save game state", e);
  }
};

export const loadGameStateFromStorage: LoadGameStateFromStorageProps = async (
  key,
  dispatch,
  defaultState
) => {
  console.log("loadGameStateFromStorage");
  // Load game state from storage
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    const loadGameState: LoadGameState = jsonValue
      ? JSON.parse(jsonValue)
      : defaultState;

    dispatch({
      type: "LOAD_GAME_STATE",
      payload: loadGameState,
    });
  } catch (e) {
    console.error("Failed to load game state", e);
  }
};

export const stopTilesAnimation: StopTilesAnimationProps = (ref, tiles) => {
  console.log("stopTilesAnimation");
  // Clear all animation timeouts
  ref.current.forEach((timeoutId) => clearTimeout(timeoutId));
  ref.current = []; // Reset timeouts

  // Reset all tile opacities
  tiles.forEach((tile) => tile.opacity.resetAnimation());
};

export const playSound = async (
  index = DEFAULT_TILE_SOUND_INDEX,
  sounds: Audio.Sound[]
) => {
  console.log("playSound");
  const sound = sounds[index];
  if (sound) {
    console.log(`Playing sound at index ${index}`);
    await sound.replayAsync(); // Replay if already loaded
  } else {
    console.warn(`Sound at index ${index} is not loaded yet`);
  }
};

export const generateTileSequence = (state: GameState) => {
  console.log("generateTileSequence");
  const {
    level: length,
    sequence: prevSequence,
    tiles,
    animationPace,
    tilesSounds,
    tileSoundIndex,
    isSoundOn,
    isInfiniteMode,
    timeoutRefs,
  } = state;

  return Array.from({ length }, (_, index) => {
    const sequenceItem =
      index >= prevSequence.length || (isInfiniteMode && length === 1)
        ? Math.floor(Math.random() * tiles.length) // Ensure valid index range
        : prevSequence[index];

    // Calculate the exact delay for this animation step
    const delay = animationPace * index;

    // Set the timeout and store its ID
    const timeoutId = window.setTimeout(async () => {
      try {
        console.log("Animating tile and Play sound");
        // Play sound asynchronously
        if (isSoundOn) playSound(tileSoundIndex, tilesSounds);

        animateTile(tiles[sequenceItem].opacity, animationPace);
      } catch (error) {
        console.error("Error during animation or sound:", error);
      }
    }, delay);

    timeoutRefs.current.push(timeoutId); // Track the timeout ID
    return sequenceItem;
  });
};
