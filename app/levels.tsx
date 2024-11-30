import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/Icons/BackButton";
import Level from "@/components/LevelsComponents/Level";
import FontText from "@/components/UI/FontText";

export default function ShowLevels() {
  return (
    <SafeAreaView style={styles.container}>
      <FontText style={styles.header}>Choose Level</FontText>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Level />
      </ScrollView>

      <BackButton
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c2a664",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
  },
});
