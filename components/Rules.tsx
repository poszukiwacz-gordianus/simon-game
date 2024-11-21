import { StyleSheet, Text, View } from "react-native";
import { rulesContent } from "@/content/content";
import Rule from "./Rule";

export default function Rules() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rules</Text>
      {rulesContent.map((rule, index) => (
        <Rule rule={rule} index={index} key={rule} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 40,
  },
  header: {
    color: "#FEF2BF",
    fontSize: 30,
    textAlign: "center",
  },
});
