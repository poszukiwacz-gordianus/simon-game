import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function GameOver() {
  return (
    <View style={styles.container}>
      <Text>Game Over</Text>
      <Button title="Try again" />
      <Link href="/">Home</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
  },
});
