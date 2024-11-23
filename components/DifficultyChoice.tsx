import { StyleSheet, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import LinkButton from "./LinkButton";

export default function DifficultyChoice() {
  const { dispatch } = useGameContext();

  return (
    <View style={styles.container}>
      <LinkButton
        title="Easy"
        onPress={() => dispatch({ type: "difficulty", payload: "easy" })}
      />
      <LinkButton
        title="Medium"
        onPress={() => dispatch({ type: "difficulty", payload: "medium" })}
      />
      <LinkButton
        title="Hard"
        onPress={() => dispatch({ type: "difficulty", payload: "hard" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
});
