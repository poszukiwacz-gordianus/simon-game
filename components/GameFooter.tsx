import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useGameContext } from "@/context/GameContext";
import { startLevel } from "@/utils/helpers";
import IconButton from "./IconButton";

export default function GameFooter() {
  const {
    state: { isPlaying, hints, level, animationPace },
    dispatch,
  } = useGameContext();

  return (
    <View style={styles.container}>
      <IconButton onPress={() => router.back()}>
        <AntDesign name="back" size={48} color="#FCFCF7" />
      </IconButton>
      <IconButton
        disabled={!isPlaying}
        onPress={() => startLevel(level, animationPace, dispatch)}
      >
        <AntDesign
          name="reload1"
          size={48}
          color={isPlaying ? "#FCFCF7" : "#755224"}
        />
      </IconButton>
      <IconButton
        disabled={!isPlaying}
        onPress={hints > 0 ? () => dispatch({ type: "showHint" }) : null}
      >
        <AntDesign
          name="bulb1"
          size={48}
          color={hints > 0 && isPlaying ? "#FCFCF7" : "#755224"}
        />
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
