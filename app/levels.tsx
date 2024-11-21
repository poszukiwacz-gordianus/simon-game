import { useGameContext } from "@/context/GameContext";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ShowLevels() {
  const {
    state: { difficulty, difficulties },
  } = useGameContext();

  const unblockedLevels = difficulties[difficulty]?.level ?? 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose level</Text>
      <View style={styles.levelContainer}>
        {Array.from({ length: 40 }, (_, index) => {
          const isBlocked = index + 1 > unblockedLevels;

          return (
            <Pressable
              style={[
                styles.level,
                {
                  backgroundColor: isBlocked ? "#373837" : "#1a8412",
                },
              ]}
              key={index}
            >
              <Link
                href={{ pathname: "/game", params: { level: index + 1 } }}
                key={index}
                style={{ color: "#FEF2BF", textAlign: "center" }}
                disabled={isBlocked}
              >
                {index + 1}
              </Link>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#437214",
  },
  header: {
    marginTop: 25,
    color: "#FEF2BF",
    fontSize: 30,
    textAlign: "center",
  },
  levelContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  level: {
    width: "20%",
    aspectRatio: 1,
    justifyContent: "center",
    textAlign: "center",
    padding: 10,
    margin: 5,
  },
});
