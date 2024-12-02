import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useGameContext } from "@/context/GameContext";
import { stopTilesAnimation } from "@/utils/helpers";
import BackButton from "../Icons/BackButton";
import IconButton from "../UI/IconButton";
import useInitializeLevelSequence from "@/hooks/useInitializeLevelSequence";

export default function GameFooter() {
  const { initializeLevelSequence } = useInitializeLevelSequence();
  const {
    state: { level, isInfiniteMode, isPlaying, hints, timeoutRefs, tiles },
    dispatch,
  } = useGameContext();

  return (
    <View style={styles.container}>
      <BackButton callback={() => stopTilesAnimation(timeoutRefs, tiles)} />
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
