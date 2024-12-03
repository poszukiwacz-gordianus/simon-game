import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { DEFAULT_MAX_LEVELS } from "@/config";
import { useGameContext } from "@/context/GameContext";
import FontText from "@/components/UI/FontText";
import IconWithPopup from "@/components/UI/IconWithPopup";
import { Colors } from "@/constants/Colors";

export default function ScoreboardModal() {
  const {
    state: { bestScore, difficulties },
  } = useGameContext();

  return (
    <IconWithPopup
      icon={<FontAwesome name="trophy" size={24} color={Colors.tint} />}
      position={{ top: 140, right: 20 }}
    >
      <>
        <FontText style={styles.header}>Scoreboard</FontText>
        <FontText style={styles.bestScoreText}>
          Best Score: <FontText style={styles.highlight}>{bestScore}</FontText>
        </FontText>

        <FontText style={[styles.header, { fontSize: 35 }]}>
          Level Progress
        </FontText>
        {Object.entries(difficulties).map(
          ([difficultyKey, difficultyValue], index) => (
            <FontText style={styles.progressText} key={index}>
              {`${
                difficultyKey.charAt(0).toUpperCase() + difficultyKey.slice(1)
              }: `}
              {difficultyValue.level === DEFAULT_MAX_LEVELS
                ? "Completed"
                : `${difficultyValue.level}/${DEFAULT_MAX_LEVELS}`}
            </FontText>
          )
        )}
      </>
    </IconWithPopup>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    marginBottom: 10,
  },
  bestScoreText: {
    fontSize: 25,
    marginBottom: 10,
    color: Colors.textPrimary,
  },
  progressText: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  highlight: {
    fontWeight: "bold",
    color: Colors.textHighlight,
  },
});
