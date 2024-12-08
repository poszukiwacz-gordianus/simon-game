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
import BackgroundColor from "@/components/UI/BackgroundColor";
import WallpapersIcon from "@/components/Features/Wallpapers/WallpapersIcon";

export default function Index() {
  // console.log("Index");
  const {
    state: { isAppActive },
  } = useGameContext();

  if (!isAppActive) {
    return <LoadingAppScreen />;
  }

  return (
    <BackgroundColor>
      <SafeAreaView style={styles.container}>
        <Play />
        <InfiniteMode />
        <InfoModal />
        <SettingsModal />
        <BackButton
          iconName="Exit App"
          isFirstScreen={true}
          style={{
            position: "absolute",
            bottom: 50,
            left: 50,
          }}
        />
        <ScoreboardModal />
        <StoreModal />
        <WallpapersIcon />
      </SafeAreaView>
    </BackgroundColor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
