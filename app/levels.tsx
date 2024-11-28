import { ScrollView, StyleSheet } from "react-native";
import { Level } from "@/components/Components";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontText, BackButton } from "@/components/Components";
import ImageTile from "@/components/ImageTile";

export default function ShowLevels() {
  return (
    <SafeAreaView style={styles.container}>
      <FontText style={styles.header}>Choose Level</FontText>
      {/* <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Level />
      </ScrollView> */}

      <ImageTile />

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
