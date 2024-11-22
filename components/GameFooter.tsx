import { useGameContext } from "@/context/GameContext";
import { Button } from "react-native";

export default function GameFooter() {
  const {
    state: { gameInProgress, level, animationPace },
    dispatch,
  } = useGameContext();

  const handlePress = () => {
    dispatch({ type: "startLevel" });
    setTimeout(
      () => dispatch({ type: "startPlay" }),
      level * animationPace + 800
    );
  };

  return (
    <Button
      title={gameInProgress ? "Reset level" : "Start"}
      onPress={
        gameInProgress ? () => dispatch({ type: "resetLevel" }) : handlePress
      }
    />
  );
}
