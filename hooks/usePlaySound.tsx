import { useEffect, useState } from "react";
import { DEFAULT_TILE_SOUND_INDEX } from "@/config";

import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

const soundMap = [
  require("@/assets/sounds/sound0.mp3"),
  require("@/assets/sounds/sound1.mp3"),
  require("@/assets/sounds/sound2.mp3"),
  require("@/assets/sounds/sound3.mp3"),
  require("@/assets/sounds/gameover.mp3"),
];

export default function usePlaySound() {
  const [playSound, setPlaySound] = useState<
    ((tileSoundIndex?: number) => Promise<void>) | null
  >(null);

  useEffect(() => {
    const loadSoundsToMemoryAndSetPlaySoundFunction = async () => {
      console.log("Loading sounds to memory...");
      Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });

      const preloadedSounds: Audio.Sound[] = [];
      for (let i = 0; i < soundMap.length; i++) {
        const { sound } = await Audio.Sound.createAsync(soundMap[i]);
        preloadedSounds.push(sound);
      }

      console.log("Sounds loaded to memory");

      const playSoundFunction = async (
        tileSoundIndex = DEFAULT_TILE_SOUND_INDEX
      ) => {
        const sound = preloadedSounds[tileSoundIndex];
        console.log(tileSoundIndex);
        console.log("playSound", preloadedSounds);
        if (sound) {
          console.log(`Playing sound at index ${tileSoundIndex}`);
          await sound.replayAsync(); // Replay if already loaded
        } else {
          console.warn(`Sound at index ${tileSoundIndex} is not loaded yet`);
        }
      };

      setPlaySound(() => playSoundFunction);
    };

    loadSoundsToMemoryAndSetPlaySoundFunction();
  }, []);

  return { playSound };
}
