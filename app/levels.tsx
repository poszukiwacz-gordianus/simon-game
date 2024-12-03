import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/Icons/BackButton";
import Level from "@/components/LevelsComponents/Level";
import FontText from "@/components/UI/FontText";
import BackgroundColor from "@/components/UI/BackgroundColor";

export default function ShowLevels() {
  return (
    <BackgroundColor>
      <SafeAreaView style={styles.container}>
        <FontText style={styles.header}>Level</FontText>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Level />
        </ScrollView>

        <View style={{ height: 150 }} />

        <BackButton
          style={{
            position: "absolute",
            bottom: 50,
            left: 50,
          }}
        />
      </SafeAreaView>
    </BackgroundColor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 40,
    marginTop: 50,
    marginBottom: 10,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
    gap: 5,
  },
});
