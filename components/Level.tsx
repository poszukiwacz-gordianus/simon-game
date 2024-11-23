import { StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import { LEVELS } from "@/config";
import { useGameContext } from "@/context/GameContext";
import FontText from "./FontText";

export default function Level() {
  const {
    state: { difficulty, difficulties },
    dispatch,
  } = useGameContext();

  const currentLevel = difficulties[difficulty]?.level ?? 0;

  return Array.from({ length: LEVELS }, (_, index) => {
    const levelNumber = index + 1;
    const isLocked = levelNumber > currentLevel;

    return (
      <Link
        key={index}
        href={{ pathname: "/game", params: { level: levelNumber } }}
        disabled={isLocked}
        style={[
          styles.container,
          {
            backgroundColor: isLocked ? "#AD8F51" : "#FEF2BF",
          },
        ]}
        onPressOut={() => dispatch({ type: "setLevel", payload: levelNumber })}
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
