import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { DEFAULT_MAX_LEVELS } from "@/config";
import { useGameContext } from "@/context/GameContext";
import FontText from "../UI/FontText";
import useInitializeLevelSequence from "@/hooks/useInitializeLevelSequence";

export default function Level() {
  const { initializeLevelSequence } = useInitializeLevelSequence();
  const {
    state: { difficulty, difficulties },
  } = useGameContext();

  const currentLevel = difficulties[difficulty]?.level ?? 0;

  return Array.from({ length: DEFAULT_MAX_LEVELS }, (_, index) => {
    const levelNumber = index + 1;
    const isLocked = levelNumber > currentLevel;

    return (
      <Link
        key={index}
        href={"/game"}
        disabled={isLocked}
        style={[
          styles.container,
          {
            backgroundColor: isLocked ? "#AD8F51" : "#FEF2BF",
          },
        ]}
        onPress={() => initializeLevelSequence(levelNumber)}
      >
        <FontText style={styles.text}>{levelNumber}</FontText>
      </Link>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    width: "20%",
    padding: 10,
    paddingVertical: 20,
    margin: 5,
  },
  text: { textAlign: "center", fontSize: 20 },
});
