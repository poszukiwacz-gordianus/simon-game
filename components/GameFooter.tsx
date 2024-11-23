import { Button, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useGameContext } from "@/context/GameContext";
import IconButton from "./IconButton";

export default function GameFooter() {
  const {
    state: { gameInProgress, level, animationPace, isPlaying, hints },
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
    <View style={styles.container}>
      <Button
        title={gameInProgress ? "Reset level" : "Start"}
        onPress={
          gameInProgress ? () => dispatch({ type: "resetLevel" }) : handlePress
        }
      />
      <IconButton onPress={() => router.back()}>
        <AntDesign name="back" size={48} color="#FCFCF7" />
      </IconButton>
      <IconButton onPress={() => dispatch({ type: "resetLevel" })}>
        <AntDesign name="reload1" size={48} color="#FCFCF7" />
      </IconButton>
      <IconButton
        disabled={!isPlaying}
        onPress={hints > 0 ? () => dispatch({ type: "showHint" }) : null}
      >
        <AntDesign
          name="bulb1"
          size={48}
          color={hints > 0 ? "#FCFCF7" : "#755224"}
        />
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
