import { StyleSheet, Text } from "react-native";
import { rulesContent } from "@/content/content";
import { SafeAreaView } from "react-native-safe-area-context";
import Rule from "./Rule";

export default function RulesS() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Rules</Text>
      {rulesContent.map((ruleText, index) => (
        <Rule key={ruleText} rule={ruleText} index={index} />
      ))}
    </SafeAreaView>
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
