import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useGameContext } from "@/context/GameContext";
import LoadingAppScreen from "@/components/IndexComponents/LoadingAppScreen";
import Play from "@/components/IndexComponents/Play";
import InfiniteMode from "@/components/IndexComponents/InfiniteMode";
import InfoModal from "@/components/Features/Info/InfoModal";
import SettingsModal from "@/components/Features/Settings/SettingsModal";
import BackButton from "@/components/Icons/BackButton";
import ScoreboardModal from "@/components/Features/Scoreboard/ScoreboardModal";
import StoreModal from "@/components/Features/Store/StoreModal";

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
      <InfoModal />
      <SettingsModal />
      <BackButton
        isFirstScreen={true}
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
        }}
      />
      <ScoreboardModal />
      <StoreModal />
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
