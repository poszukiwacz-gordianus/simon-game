import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useGameContext } from "@/context/GameContext";
import Modal from "../UI/Modal";
import FontText from "../UI/FontText";
import IconButton from "../UI/IconButton";
import useInitializeLevelSequence from "@/hooks/useInitializeLevelSequence";
import { Colors } from "@/constants/Colors";

export default function GameOver() {
  const { initializeLevelSequence } = useInitializeLevelSequence();
  const {
    state: { level, bestScore, isInfiniteMode, isNewBestScore },
  } = useGameContext();

  console.log(
    "GAMEOVER BESTSCORE: ___________________________________________________________",
    bestScore
  );

  if (isInfiniteMode)
    return (
      <Modal isGameOver={!isNewBestScore}>
        <FontText
          style={[
            styles.header,
            {
              color: isNewBestScore ? Colors.textPrimary : Colors.textSecondary,
            },
          ]}
        >
          {isNewBestScore ? "New best!" : "Game over"}
        </FontText>
        {isNewBestScore ? (
          <FontText style={styles.best}>{bestScore}</FontText>
        ) : (
          <>
            <FontText style={styles.text}>Your score: {level}</FontText>
            <FontText style={styles.text}>Best score: {bestScore}</FontText>
          </>
        )}
        <View style={{ flexDirection: "row" }}>
          <IconButton
            iconName="Try Again"
            onPress={() => initializeLevelSequence(0)}
          >
            <AntDesign name="reload1" size={48} color={Colors.iconTint} />
          </IconButton>
          <IconButton iconName="Home" onPress={() => router.navigate("/")}>
            <AntDesign name="home" size={48} color={Colors.iconTint} />
          </IconButton>
        </View>
      </Modal>
    );

  return (
    <Modal isGameOver={true}>
      <FontText style={styles.header}>Game over</FontText>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          iconName="Try Again"
          onPress={() => initializeLevelSequence(level)}
        >
          <AntDesign name="reload1" size={48} color={Colors.iconTint} />
        </IconButton>
        <IconButton iconName="Home" onPress={() => router.navigate("/")}>
          <AntDesign name="home" size={48} color={Colors.iconTint} />
        </IconButton>
      </View>
    </Modal>
  );
}

export const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    marginBottom: 20,
    color: Colors.textSecondary,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  best: {
    fontSize: 50,
    marginBottom: 20,
  },
});
