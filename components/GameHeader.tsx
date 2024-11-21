import { useGameContext } from "@/context/GameContext";
import { Button, StyleSheet, Text, View } from "react-native";

export default function GameHeader() {
  const {
    state: { level, hints, togo, isPlaying },
    dispatch,
  } = useGameContext();

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.header}>Level {level}</Text>
      <Text style={styles.header}>To go: {togo}</Text>
      <Button
        title={hints === 0 ? "No hints left" : `Hint - Remains (${hints})`}
        disabled={!isPlaying}
        onPress={() => hints > 0 && dispatch({ type: "showHint" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "#FEF2BF",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
});
