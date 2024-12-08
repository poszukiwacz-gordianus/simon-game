import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/Icons/BackButton";
import BackgroundColor from "@/components/UI/BackgroundColor";
import WallpapersContainer from "@/components/Features/Wallpapers/WallpapersContainer";
import Coins from "@/components/UI/Coins";

export default function wallpapers() {
  return (
    <BackgroundColor>
      <SafeAreaView style={{ flex: 1 }}>
        <Coins />
        <WallpapersContainer />

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
