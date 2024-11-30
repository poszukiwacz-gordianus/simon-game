import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Play, InfiniteMode, Rules, ScoreBoard } from "@/components/Components";
import { Settings, BackButton } from "@/components/Components";
import { useGameContext } from "@/context/GameContext";
import LoadingAppScreen from "@/components/LoadingAppScreen";

export default function Index() {
  console.log("Index");
  const {
    state: { isAppActive },
  } = useGameContext();

  if (!isAppActive) {
    return <LoadingAppScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Play />
      <InfiniteMode />
      <Rules />
      <Settings />
      <BackButton
        isFirstScreen={true}
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
        }}
      />
      <ScoreBoard />
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
