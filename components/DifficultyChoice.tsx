import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameContext } from "@/context/GameContext";
import LinkButton from "./LinkButton";

export default function DifficultyChoice() {
  const { dispatch } = useGameContext();

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: "center",
  },
});
