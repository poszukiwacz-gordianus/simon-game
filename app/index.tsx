import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { DifficultyChoice, Rules } from "@/components/Components";
import { useLoadOnAppStart } from "@/hooks/useHooks";

export default function Index() {
  useLoadOnAppStart();

  return (
    <SafeAreaView style={styles.container}>
      <DifficultyChoice />
      <Rules />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c2a664",
  },
});
