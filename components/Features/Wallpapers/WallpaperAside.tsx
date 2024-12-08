import FontText from "@/components/UI/FontText";
import { Button, StyleSheet, View } from "react-native";
import { WallpaperProps } from "@/types/types";
import { useStoreContext } from "@/context/StoreContext";
import { Colors } from "@/constants/Colors";
import { downloadWallpaper, setWallpaper } from "@/utils/helpers";
import * as MediaLibrary from "expo-media-library";
import { useEffect } from "react";
import ButtonBuyWallpaper from "./ButtonBuyWallpaper";
import { WALLPAPER_COST } from "@/config";

export default function WallpaperAside({ item }: { item: WallpaperProps }) {
  const { dispatch: storeDispatch } = useStoreContext();
  const {
    setId,
    setName,
    wallpaper: { id: wallpaperId, isUnlocked, isDownloaded, fileUri },
  } = item;

  const getMediaLibraryPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
    }
  };

  useEffect(() => {
    getMediaLibraryPermissions();
  }, []);

  const handleDownload = async () => {
    const fileUri = await downloadWallpaper(setName, wallpaperId);
    if (fileUri !== "" && fileUri !== undefined) {
      storeDispatch({
        type: "STORE_SET_WALLPAPER",
        payload: { setId, wallpaperId, fileUri },
      });
    }
  };

  return (
    <View style={[styles.aside]}>
      <FontText style={styles.cardHeader}>{setName}</FontText>

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
        <Button
          title={`Buy for ${WALLPAPER_COST} coins`}
          color={Colors.buttonPrimary}
          onPress={() =>
            storeDispatch({
              type: "STORE_BUY_WALLPAPER",
              payload: { setId, wallpaperId },
            })
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  aside: {
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontSize: 24,
    padding: 10,
    color: Colors.textPrimary,
    backgroundColor: Colors.backgroundAccent,
    borderRadius: 10,
  },
  cardAside: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    color: Colors.textPrimary,
  },
});
