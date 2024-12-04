import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/Icons/BackButton";
import Level from "@/components/LevelsComponents/Level";
import BackgroundColor from "@/components/UI/BackgroundColor";

export default function ShowLevels() {
  return (
    <BackgroundColor>
      <SafeAreaView style={styles.container}>
        <Level />

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
  },
});
