import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameContext } from "@/context/GameContext";
import {
  GameFooter,
  GameHeader,
  GameOver,
  TilesContainer,
  Sound,
} from "@/components/Components";

export default function Game() {
  const {
    state: { gameOver },
  } = useGameContext();

  return (
    <SafeAreaView style={styles.container}>
      {gameOver && <GameOver />}

      <GameHeader />
      <TilesContainer />
      <GameFooter />
      <Sound />
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
