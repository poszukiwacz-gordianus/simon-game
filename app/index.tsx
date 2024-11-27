import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { DifficultyChoice, Rules } from "@/components/Components";
import { useLoadOnAppStart } from "@/hooks/useHooks";
import Sound from "@/components/Sound";

export default function Index() {
  useLoadOnAppStart();

  return (
    <SafeAreaView style={styles.container}>
      <DifficultyChoice />
      <Rules />
      <Sound />
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
