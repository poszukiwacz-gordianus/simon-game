import { Button, StyleSheet, Text, View } from "react-native";
import { useGameContext } from "@/context/GameContext";

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
    <View style={styles.container}>
      <Text style={styles.header}>Level {level}</Text>
      <Text style={styles.subHeader}>Remaining: {toGo}</Text>
      <Button
        title={hints === 0 ? "No hints left" : `Hint - Remaining (${hints})`}
        disabled={!isPlaying}
        onPress={handleHintPress}
      />
    </View>
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
