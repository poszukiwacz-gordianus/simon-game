import { ScrollView, StyleSheet, Text } from "react-native";
import { Level } from "@/components/Components";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShowLevels() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Choose Level</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Level />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#437214",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    color: "#FEF2BF",
    marginVertical: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    paddingBottom: 80,
    justifyContent: "center",
  },
});
