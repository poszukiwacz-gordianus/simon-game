import { StyleSheet, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import {
  GameFooter,
  GameHeader,
  Message,
  TilesContainer,
} from "@/components/Components";

export default function Game() {
  const {
    state: { gameOver, levelUp },
    dispatch,
  } = useGameContext();

  if (levelUp)
    return (
      <Message
        messageText="Congratulations 🎉"
        onPressHandler={() => dispatch({ type: "nextLevel" })}
        buttonText="Next level"
        backgroundColor="#23d14c"
        primaryColor="#ea2e2e"
        secondaryColor="#251055"
      />
    );

  if (gameOver)
    return (
      <Message
        messageText="Game over 😥"
        onPressHandler={() => dispatch({ type: "resetLevel" })}
        buttonText="Try again"
        backgroundColor="#ea2e2e"
        primaryColor="#23d14c"
        secondaryColor="#251055"
      />
    );

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
});
