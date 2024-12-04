import { Animated, Platform } from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  type SaveStateToStorageProps,
  type LoadStateFromStorageProps,
  type AnimatedTileProps,
  type StopTilesAnimationProps,
  type GameState,
  type LoadTiles,
} from "@/types/types";
import { DEFAULT_TILE_SOUND_INDEX } from "@/config";

import tilesImages from "@/assets/images/tiles";
import soundMap from "@/assets/sounds";

export const loadTiles: LoadTiles = (storeState, defaultTilesSet) => {
  // Find the used tiles set from data loaded from storage
  const usedTilesSet = storeState.tilesSets.find((set) => set.isCurrentlyUsed);

  // If there is no used tiles set, return the default tiles
  if (!usedTilesSet) return defaultTilesSet;

  // Get the tiles object
  const tilesSet = tilesImages.find((set) => set.id === usedTilesSet.id);

  // If there is no tiles set found, return the default tiles
  if (!tilesSet) return defaultTilesSet;

  const { id, ...tilesObject } = tilesSet;

  // Extract the tiles array
  const tilesArray = Object.values(tilesObject)[0];

  // Return new tiles with swapped image sources
  return defaultTilesSet.map(({ source, opacity }, index) => ({
    source: tilesArray[index],
    opacity,
  }));
};

export const animateTile: AnimatedTileProps = (tileOpacity, pace) => {
  // console.log("animateTile");
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

export const saveStateToStorage: SaveStateToStorageProps = async (
  key,
  stateToSave
) => {
  // console.log("SaveStateToStorage");
  // Save game state
  try {
    await AsyncStorage.setItem(key, JSON.stringify(stateToSave));
  } catch (e) {
    console.error("Failed to save game state", e);
  }
};

export const loadStateFromStorage: LoadStateFromStorageProps = async (
  key,
  dispatch,
  type,
  defaultState
) => {
  // console.log("loadStateFromStorage");
  return new Promise(async (resolve) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const loadState = jsonValue ? await JSON.parse(jsonValue) : defaultState;

      dispatch({
        type,
        payload: loadState,
      } as any);

      resolve(loadState);
    } catch (e) {
      console.error("Failed to load state from storage", e);
      resolve(defaultState);
    }
  });
};

export const stopTilesAnimation: StopTilesAnimationProps = (ref, tiles) => {
  // console.log("stopTilesAnimation");
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
  // console.log("playSound");
  const sound = sounds[index];
  if (sound) {
    // console.log(`Playing sound at index ${index}`);
    await sound.stopAsync();
    await sound.replayAsync(); // Replay if already loaded
  } else {
    console.warn(`Sound at index ${index} is not loaded yet`);
  }
};

export const generateTileSequence = (state: GameState) => {
  // console.log("generateTileSequence");
  const {
    level,
    sequence: prevSequence,
    tiles,
    animationPace,
    tilesSounds,
    tileSoundIndex,
    isSoundOn,
    isInfiniteMode,
    timeoutRefs,
  } = state;

  const length = isInfiniteMode ? level + 1 : level;

  return Array.from({ length }, (_, index) => {
    const sequenceItem =
      index >= prevSequence.length
        ? Math.floor(Math.random() * tiles.length) // Ensure valid index range
        : prevSequence[index];

    // Calculate the exact delay for this animation step
    const delay = animationPace * index;

    // Set the timeout and store its ID
    const timeoutId = window.setTimeout(async () => {
      try {
        // console.log("Animating tile and Play sound");
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

/**
 * Loads all game sounds to memory and sets the audio mode to allow
 * background play and ducking of other audio.
 *
 * @returns {Promise<Audio.Sound[]>} A promise that resolves to an array of
 *   Audio.Sound objects, each representing a loaded sound.
 */
export const loadSoundsToMemory = async (): Promise<Audio.Sound[]> => {
  // console.log("Loading sounds...");
  if (Platform.OS === "android") {
    // Adjust settings for Android
    await Audio.setAudioModeAsync({
      staysActiveInBackground: false, // Avoids overriding other background audio
      playsInSilentModeIOS: true, // Optional for cross-platform compatibility
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix, // Do not mix with other audio
      shouldDuckAndroid: false, // Prevents other apps' audio from ducking
      playThroughEarpieceAndroid: false, // Avoid forcing earpiece playback
    });
  } else if (Platform.OS === "ios") {
    // Configure for iOS
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
    });
  }

  const sounds = await Promise.all(
    soundMap.map((soundFile) =>
      Audio.Sound.createAsync(soundFile).then(({ sound }) => sound)
    )
  );

  // console.log("Sounds loaded to memory");
  return sounds;
};
