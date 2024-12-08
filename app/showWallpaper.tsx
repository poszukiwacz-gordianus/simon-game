import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/Icons/BackButton";
import BackgroundColor from "@/components/UI/BackgroundColor";
import FontText from "@/components/UI/FontText";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { useStoreContext } from "@/context/StoreContext";
import * as MediaLibrary from "expo-media-library";
import { downloadWallpaper, setWallpaper } from "@/utils/helpers";
import { Colors } from "@/constants/Colors";
import ButtonBuyWallpaper from "@/components/Features/Wallpapers/ButtonBuyWallpaper";
import Coins from "@/components/UI/Coins";
import WallpaperBuyModal from "@/components/Features/Wallpapers/WallpaperBuyModal";

export default function showWallpaper() {
  const params = useLocalSearchParams();
  const { id } = params;
  const wallpaperId = +id;

  const {
    state: { tilesSets },
    dispatch: storeDispatch,
  } = useStoreContext();

  const tileSet = tilesSets.find((tileSet) =>
    tileSet.wallpapers.find((wallpaper) => wallpaper.id === wallpaperId)
  );

  if (!tileSet) return null;

  const { setName, id: setId, tiles, wallpapers } = tileSet;

  const wallpaper = wallpapers.find(
    (wallpaper) => wallpaper.id === wallpaperId
  );

  const tileId = wallpapers.findIndex(
    (wallpaper) => wallpaper.id === wallpaperId
  );
  const tile = tiles[tileId];

  if (!wallpaper) return null;

  const { isUnlocked, isDownloaded, fileUri } = wallpaper;

  const handleDownload = async () => {
    const getMediaLibraryPermissions = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    };

    getMediaLibraryPermissions();

    const fileUri = await downloadWallpaper(setName, wallpaperId);
    if (fileUri !== "" && fileUri !== undefined) {
      storeDispatch({
        type: "STORE_SET_WALLPAPER",
        payload: { setId, wallpaperId, fileUri },
      });
    }
  };

  return (
    <BackgroundColor>
      <SafeAreaView style={styles.container}>
        <FontText style={styles.header}>{setName}</FontText>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={tile}
            contentFit="cover"
            transition={1000}
          />
        </View>

        {isUnlocked && !isDownloaded && (
          <Button
            title="Download"
            color={Colors.buttonSecondary}
            onPress={handleDownload}
          />
        )}

        {isDownloaded && (
          <Button
            title="Set wallpaper"
            color={Colors.buttonSecondary}
            onPress={() => setWallpaper(fileUri)}
          />
        )}

        {!isUnlocked && (
          <ButtonBuyWallpaper setId={setId} wallpaperId={wallpaperId} />
        )}

        <View style={{ height: 150 }} />
        <BackButton
          style={{
            position: "absolute",
            bottom: 50,
            left: 50,
          }}
        />

        <Coins />
        <WallpaperBuyModal />
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
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    height: "65%",
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
