import { StyleSheet } from "react-native";
import FontText from "../UI/FontText";
import GameMode from "../UI/GameMode";
import { Colors } from "@/constants/Colors";

export default function InfiniteMode() {
  return (
    <GameMode isInfiniteMode={true}>
      <FontText style={styles.button}>Infinite Mode</FontText>
    </GameMode>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    fontSize: 30,
    padding: 10,
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.buttonSecondary,
    borderRadius: 10,
  },
});
