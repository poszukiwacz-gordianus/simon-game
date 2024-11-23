import { Button, StyleSheet, Text } from "react-native";
import { useGameContext } from "@/context/GameContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameHeader() {
  const {
    state: { level, hints, toGo, isPlaying },
    dispatch,
  } = useGameContext();

  const handleHintPress = () => {
    if (hints > 0) {
      dispatch({ type: "showHint" });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Level {level}</Text>
      <Text style={styles.subHeader}>Remaining: {toGo}</Text>
      <Button
        title={hints === 0 ? "No hints left" : `Hint - Remaining (${hints})`}
        disabled={!isPlaying}
        onPress={handleHintPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  header: {
    color: "#FEF2BF",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  subHeader: {
    color: "#FEF2BF",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
  },
});
