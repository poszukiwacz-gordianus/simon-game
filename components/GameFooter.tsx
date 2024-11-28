import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useGameContext } from "@/context/GameContext";
import { useInitializeLevelSequence } from "@/hooks/useHooks";
import IconButton from "./IconButton";
import BackButton from "./BackButton";

export default function GameFooter() {
  const {
    state: { isPlaying, hints, level, isInfiniteMode },
    dispatch,
    stopAnimation,
  } = useGameContext();

  const { initializeLevelSequence } = useInitializeLevelSequence();

  return (
    <View style={styles.container}>
      <BackButton callback={stopAnimation} />
      {!isInfiniteMode && (
        <IconButton
          disabled={!isPlaying}
          onPress={() => initializeLevelSequence(level)}
        >
          <AntDesign
            name="reload1"
            size={48}
            color={isPlaying ? "#FCFCF7" : "#755224"}
          />
        </IconButton>
      )}
      <IconButton
        disabled={!isPlaying}
        onPress={hints > 0 ? () => dispatch({ type: "SHOW_HINT" }) : null}
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
    justifyContent: "space-between",
    width: "100%",
  },
});
