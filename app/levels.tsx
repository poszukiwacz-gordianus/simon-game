import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ShowLevels() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose level</Text>
      <View style={styles.levelContainer}>
        {Array.from({ length: 40 }, (_, index) => (
          <Pressable style={styles.level} key={index}>
            <Link
              href={{ pathname: "/game", params: { level: index + 1 } }}
              key={index}
              style={{ color: "#FEF2BF", textAlign: "center" }}
            >
              {index + 1}
            </Link>
          </Pressable>
        ))}
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
    backgroundColor: "#1a8412",
    padding: 10,
    margin: 5,
  },
});
