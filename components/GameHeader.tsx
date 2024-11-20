import { Button, StyleSheet, Text, View } from "react-native";

export default function GameHeader({ level }: { level: number }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.header}>Level {level}</Text>
      <Text style={styles.header}>To go: {level}</Text>
      <Button title="Hint - Remains (3)" />
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
