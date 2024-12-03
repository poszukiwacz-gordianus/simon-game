import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { DEFAULT_MAX_LEVELS } from "@/config";
import { useGameContext } from "@/context/GameContext";
import FontText from "../UI/FontText";
import useInitializeLevelSequence from "@/hooks/useInitializeLevelSequence";
import { Colors } from "@/constants/Colors";

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
        onPress={() => initializeLevelSequence(levelNumber)}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: isLocked
                ? Colors.levelDisabled
                : Colors.levelEnabled,
            },
          ]}
        >
          <FontText style={styles.text}>{levelNumber}</FontText>
        </View>
      </Link>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  text: { fontSize: 30, color: Colors.textSecondary },
});
