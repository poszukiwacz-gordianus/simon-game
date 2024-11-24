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
        onPress={() => dispatch({ type: "SET_DIFFICULTY", payload: "easy" })}
      />
      <LinkButton
        title="Medium"
        onPress={() => dispatch({ type: "SET_DIFFICULTY", payload: "medium" })}
      />
      <LinkButton
        title="Hard"
        onPress={() => dispatch({ type: "SET_DIFFICULTY", payload: "hard" })}
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
