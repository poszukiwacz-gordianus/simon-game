import { useEffect, useState } from "react";
import { Audio } from "expo-av";

export default function useSounds() {
  const [sounds, setSounds] = useState<Audio.Sound[]>([]); // Array of Audio.Sound

  useEffect(() => {
    const loadSounds = async () => {
      const soundFiles = [
        require("../assets/sounds/tileOne.mp3"),
        require("../assets/sounds/tileTwo.mp3"),
        require("../assets/sounds/tileThree.mp3"),
        require("../assets/sounds/tileFour.mp3"),
        require("../assets/sounds/wrong.mp3"),
      ];

      const loadedSounds = await Promise.all(
        soundFiles.map(async (file) => {
          const sound = new Audio.Sound();
          await sound.loadAsync(file);
          return sound;
        })
      );

      setSounds(loadedSounds);
    };

    loadSounds();

    return () => {
      sounds.forEach((sound) => {
        if (sound) {
          sound.unloadAsync(); // Safely unload sounds
        }
      });
    };
  }, []);

  const playSound = async (index: number) => {
    try {
      if (sounds[index]) {
        await sounds[index].stopAsync(); // Stop any currently playing sound
        await sounds[index].replayAsync(); // Replay the sound
      } else {
        console.warn(`Sound at index ${index} not found`);
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  return { sounds, playSound };
}
