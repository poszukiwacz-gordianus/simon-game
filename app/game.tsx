import { StyleSheet, View } from "react-native";
import GameFooter from "@/components/GameFooter";
import GameHeader from "@/components/GameHeader";
import TilesContainer from "@/components/TilesContainer";
import { useGameContext } from "@/context/GameContext";
import GameOver from "@/components/GameOver";
import LevelUp from "@/components/LevelUp";

export default function Game() {
  const {
    state: { gameOver, levelUp },
  } = useGameContext();

  if (levelUp) return <LevelUp />;
  if (gameOver) return <GameOver />;
  return (
    <View style={styles.container}>
      <GameHeader />
      <TilesContainer />
      <GameFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#437214",
  },
  gameOver: {
    backgroundColor: "red",
    color: "white",
    flex: 1,
  },
});
