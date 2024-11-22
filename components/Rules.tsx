import { StyleSheet, Text, View } from "react-native";
import { rulesContent } from "@/content/content";
import { Rule } from "@/components/Components";

export default function RulesS() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rules</Text>
      {rulesContent.map((ruleText, index) => (
        <Rule key={ruleText} rule={ruleText} index={index} />
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
