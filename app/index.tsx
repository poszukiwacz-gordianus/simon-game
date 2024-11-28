import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Play, InfiniteMode, Rules } from "@/components/Components";
import { useLoadOnAppStart } from "@/hooks/useHooks";
import Settings from "@/components/Settings";

export default function Index() {
  useLoadOnAppStart();

  return (
    <SafeAreaView style={styles.container}>
      <Play />
      <InfiniteMode />
      <Rules />
      <Settings />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c2a664",
  },
});
