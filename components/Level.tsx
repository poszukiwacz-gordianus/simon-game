import { StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import { LEVELS } from "@/config";
import { useGameContext } from "@/context/GameContext";

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
            backgroundColor: isLocked ? "#373837" : "#1a8412",
          },
        ]}
        onPressOut={() => dispatch({ type: "setLevel", payload: levelNumber })}
      >
        <Text style={styles.text}>{levelNumber}</Text>
      </Link>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    width: "40%",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 5,
  },
  text: { color: "#FEF2BF", textAlign: "center" },
});
