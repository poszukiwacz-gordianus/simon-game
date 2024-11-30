import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameContext } from "@/context/GameContext";
import GameOver from "@/components/GameComponents/GameOver";
import GameHeader from "@/components/GameComponents/GameHeader";
import GameTilesContainer from "@/components/GameComponents/GameTilesContainer";
import GameFooter from "@/components/GameComponents/GameFooter";
import SoundModal from "@/components/Icons/SoundModal";

export default function Game() {
  const {
    state: { gameOver },
  } = useGameContext();

  return (
    <SafeAreaView style={styles.container}>
      {gameOver && <GameOver />}

      <GameHeader />
      <GameTilesContainer />
      <GameFooter />
      <SoundModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    position: "relative",
    padding: 50,
    backgroundColor: "#c2a664",
    justifyContent: "center",
    alignItems: "center",
  },
});
