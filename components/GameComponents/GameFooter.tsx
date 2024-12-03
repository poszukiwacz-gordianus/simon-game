import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useGameContext } from "@/context/GameContext";
import { stopTilesAnimation } from "@/utils/helpers";
import BackButton from "../Icons/BackButton";
import IconButton from "../UI/IconButton";
import useInitializeLevelSequence from "@/hooks/useInitializeLevelSequence";
import { Colors } from "@/constants/Colors";

export default function GameFooter() {
  const { initializeLevelSequence } = useInitializeLevelSequence();
  const { state, dispatch } = useGameContext();

  const isPlaying = state.isPlaying;
  const isInfiniteMode = state.isInfiniteMode;
  const level = state.level;
  const hints = state.hints;
  const timeoutRefs = state.timeoutRefs;
  const tiles = state.tiles;

  const handleShowHint = () => dispatch({ type: "GAME_SHOW_HINT" });
  const handleTryAgain = () => initializeLevelSequence(level);

  return (
    <View style={styles.container}>
      <BackButton callback={() => stopTilesAnimation(timeoutRefs, tiles)} />
      {!isInfiniteMode && (
        <IconButton
          iconName="Try Again"
          disabled={!isPlaying}
          onPress={handleTryAgain}
          style={{ color: isPlaying ? Colors.iconTint : Colors.Disabled }}
        >
          <AntDesign
            name="reload1"
            size={48}
            color={isPlaying ? Colors.iconTint : Colors.Disabled}
          />
        </IconButton>
      )}
      <IconButton
        iconName="Hint"
        disabled={!isPlaying || hints === 0}
        onPress={handleShowHint}
        style={{
          color: isPlaying && hints > 0 ? Colors.iconTint : Colors.Disabled,
        }}
      >
        <AntDesign
          name="bulb1"
          size={48}
          color={isPlaying && hints > 0 ? Colors.iconTint : Colors.Disabled}
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
