import { useGameContext } from "@/context/GameContext";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ShowLevels() {
  const {
    state: { difficulty, difficulties },
    dispatch,
  } = useGameContext();

  const unblockedLevels = difficulties[difficulty]?.level ?? 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose level</Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 10,
          paddingBottom: 80,
          justifyContent: "center",
        }}
      >
        {Array.from({ length: 40 }, (_, index) => {
          const isBlocked = index + 1 > unblockedLevels;

          return (
            <Link
              key={index}
              href={{ pathname: "/game", params: { level: index + 1 } }}
              disabled={isBlocked}
              style={[
                styles.level,
                {
                  backgroundColor: isBlocked ? "#373837" : "#1a8412",
                },
              ]}
              onPressOut={() =>
                dispatch({ type: "setLevel", payload: index + 1 })
              }
            >
              <Text style={{ color: "#FEF2BF", textAlign: "center" }}>
                {index + 1}
              </Text>
            </Link>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#437214",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 25,
    color: "#FEF2BF",
    fontSize: 30,
    textAlign: "center",
  },
  level: {
    width: "20%",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 5,
  },
});
