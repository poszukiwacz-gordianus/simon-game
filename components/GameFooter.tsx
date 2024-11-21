import { useGameContext } from "@/context/GameContext";
import { Button } from "react-native";

export default function GameFooter() {
  const {
    state: { isPlaying, level, gameInProgress },
    dispatch,
  } = useGameContext();

  if (gameInProgress)
    return (
      <Button
        title="Reset level"
        onPress={() => {
          dispatch({ type: "resetLevel" });
        }}
      />
    );

  return (
    <Button
      title="Start"
      onPress={() => {
        dispatch({ type: "startLevel" });
        setTimeout(() => {
          dispatch({ type: "startPlay" });
          dispatch({ type: "gameInProgress" });
        }, level * 600);
      }}
    />
  );
}
