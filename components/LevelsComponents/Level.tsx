import { FlatList, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { DEFAULT_MAX_LEVELS } from "@/config";
import { useGameContext } from "@/context/GameContext";
import FontText from "../UI/FontText";
import useInitializeLevelSequence from "@/hooks/useInitializeLevelSequence";
import { Colors } from "@/constants/Colors";

export default function Level() {
  const { initializeLevelSequence } = useInitializeLevelSequence();
  const {
    state: { difficulty, difficulties, animationPace },
  } = useGameContext();

  const currentLevel = difficulties[difficulty]?.level ?? 0;

  const levels = Array.from({ length: DEFAULT_MAX_LEVELS }, (_, index) => {
    const levelNumber = index + 1;
    const isLocked = levelNumber > currentLevel;

    return {
      key: String(index),
      levelNumber,
      isLocked,
    };
  });

  return (
    <FlatList
      ListHeaderComponent={<FontText style={styles.header}>Levels</FontText>}
      data={levels}
      renderItem={({ item }) => (
        <Link
          href={"/game"}
          disabled={item.isLocked}
          onPress={() =>
            initializeLevelSequence(item.levelNumber, animationPace, true)
          }
        >
          <View
            style={[
              styles.container,
              {
                backgroundColor: item.isLocked
                  ? Colors.levelDisabled
                  : Colors.levelEnabled,
              },
            ]}
          >
            <FontText style={styles.text}>{item.levelNumber}</FontText>
          </View>
        </Link>
      )}
      numColumns={3}
      contentContainerStyle={styles.flatListContent}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  header: {
    fontSize: 40,
    marginTop: 50,
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 30,
    color: Colors.textSecondary,
  },
  flatListContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    gap: 10,
    marginBottom: 10,
  },
});
