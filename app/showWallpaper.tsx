import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStoreContext } from "@/context/StoreContext";

import BackButton from "@/components/Icons/BackButton";
import BackgroundColor from "@/components/UI/BackgroundColor";
import FontText from "@/components/UI/FontText";
import Coins from "@/components/UI/Coins";
import BuyMoreCoinsModal from "@/components/ShowWallpaperComponents/BuyMoreCoinsModal";
import ActionButtons from "@/components/ShowWallpaperComponents/ActionButtons";
import ImageWallpaper from "@/components/ShowWallpaperComponents/ImageWallpaper";

export default function ShowWallpaper() {
  // Get params
  const params = useLocalSearchParams();
  const { id: wallpaperIdParam } = params;

  // From string to number
  const wallpaperId = Number(wallpaperIdParam);

  const {
    state: { tilesSets },
  } = useStoreContext();

  // Find tile set matching the wallpaper
  const tileSet = tilesSets.find((tileSet) =>
    tileSet.wallpapers.find((wallpaper) => wallpaper.id === wallpaperId)
  );

  if (!tileSet) return null;

  return (
    <BackgroundColor>
      <SafeAreaView style={styles.container}>
        <FontText style={styles.header}>{tileSet.setName}</FontText>

        <ImageWallpaper
          tileImages={tileSet.tiles}
          wallpapers={tileSet.wallpapers}
          selectedWallpaperId={wallpaperId}
        />

        <ActionButtons tileSet={tileSet} wallpaperId={wallpaperId} />

        <View style={{ height: 150 }} />
        <BackButton
          style={{
            position: "absolute",
            bottom: 50,
            left: 50,
          }}
        />

        <Coins />
        <BuyMoreCoinsModal />
      </SafeAreaView>
    </BackgroundColor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },
});
