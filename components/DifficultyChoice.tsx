import { StyleSheet, View } from "react-native";
import Button from "./Button";
import { useGameContext } from "@/context/GameContext";

export default function DifficultyChoice() {
  const { dispatch } = useGameContext();

  return (
    <View style={styles.container}>
      <Button
        title="Easy"
        onPress={() => dispatch({ type: "difficulty", payload: "easy" })}
      />
      <Button
        title="Medium"
        onPress={() => dispatch({ type: "difficulty", payload: "medium" })}
      />
      <Button
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
