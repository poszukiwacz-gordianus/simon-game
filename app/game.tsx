import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameContext } from "@/context/GameContext";
import {
  GameFooter,
  GameHeader,
  GameOver,
  TilesContainer,
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    padding: 50,
    backgroundColor: "#437214",
    justifyContent: "center",
    alignItems: "center",
  },
});
