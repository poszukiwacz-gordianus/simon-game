import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHandleLevelUp } from "@/hooks/useHooks";
import { useGameContext } from "@/context/GameContext";
import GameOver from "@/components/GameComponents/GameOver";
import GameHeader from "@/components/GameComponents/GameHeader";
import GameTilesContainer from "@/components/GameComponents/GameTilesContainer";
import GameFooter from "@/components/GameComponents/GameFooter";
import SoundModal from "@/components/Icons/SoundModal";
import BackgroundColor from "@/components/UI/BackgroundColor";
import Coins from "@/components/UI/Coins";

export default function Game() {
  const {
    state: { gameOver },
  } = useGameContext();

  useHandleLevelUp();

  return (
    <BackgroundColor>
      <SafeAreaView style={styles.container}>
        {gameOver && <GameOver />}

        <GameHeader />
        <GameTilesContainer />
        <GameFooter />
        <SoundModal />
        <Coins />
      </SafeAreaView>
    </BackgroundColor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
