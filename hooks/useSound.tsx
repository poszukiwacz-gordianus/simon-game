import { useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { DEFAULT_TILE_SOUND_INDEX } from "@/config";

const soundMap: { [key: number]: any } = {
  0: require("@/assets/sounds/sound0.mp3"),
  1: require("@/assets/sounds/sound1.mp3"),
  2: require("@/assets/sounds/sound2.mp3"),
  3: require("@/assets/sounds/sound3.mp3"),
  4: require("@/assets/sounds/gameover.mp3"),
};

export default function useSound() {
  const soundRef = useRef<Audio.Sound | null>(null);

  async function playSound(tile: number = DEFAULT_TILE_SOUND_INDEX) {
    const soundAsset = soundMap[tile];

    if (!soundAsset) {
      console.error(`Sound not found for tile ${tile}`);
      return;
    }

    const { sound } = await Audio.Sound.createAsync(soundAsset);
    soundRef.current = sound;

    try {
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  useEffect(() => {
    return () => {
      if (soundRef.current !== null) {
        soundRef.current.unloadAsync();
      }
    };
  }, [soundRef]);

  return { playSound };
}
