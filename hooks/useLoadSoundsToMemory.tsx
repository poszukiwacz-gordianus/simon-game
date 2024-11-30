import { useEffect, useState } from "react";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

const soundMap = [
  require("@/assets/sounds/sound0.mp3"),
  require("@/assets/sounds/sound1.mp3"),
  require("@/assets/sounds/sound2.mp3"),
  require("@/assets/sounds/sound3.mp3"),
  require("@/assets/sounds/gameover.mp3"),
];

export default function useLoadSoundsToMemory() {
  console.log("useLoadSoundsToMemory");
  const [tilesSounds, setTilesSounds] = useState<Audio.Sound[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSoundsToMemory = async () => {
      console.log("Loading sounds to memory...");
      Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });
      for (let i = 0; i < soundMap.length; i++) {
        const { sound } = await Audio.Sound.createAsync(soundMap[i]);
        setTilesSounds((sounds) => [...sounds, sound]);
      }

      console.log("Sounds loaded to memory");
      setIsLoading(false);
    };

    loadSoundsToMemory();
  }, []);

  return { tilesSounds, isLoading };
}
