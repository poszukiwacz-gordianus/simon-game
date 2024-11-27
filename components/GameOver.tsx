import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useInitializeLevelSequence } from "@/hooks/useHooks";
import { useGameContext } from "@/context/GameContext";
import FontText from "./FontText";
import IconButton from "./IconButton";
import Modal from "./Modal";

export default function GameOver() {
  const {
    state: { level },
  } = useGameContext();
  const { initializeLevelSequence } = useInitializeLevelSequence();

  return (
    <Modal>
      <FontText style={styles.text}>Game over</FontText>
      <View style={{ flexDirection: "row" }}>
        <IconButton onPress={() => initializeLevelSequence(level)}>
          <AntDesign name="reload1" size={48} color="#FCFCF7" />
        </IconButton>
        <IconButton onPress={() => router.navigate("/")}>
          <AntDesign name="home" size={48} color="#FCFCF7" />
        </IconButton>
      </View>
    </Modal>
  );
}

export const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    marginBottom: 20,
  },
});
