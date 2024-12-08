import FontText from "@/components/UI/FontText";
import { Button, StyleSheet, View } from "react-native";
import { type Wallpapers } from "@/types/types";
import { useStoreContext } from "@/context/StoreContext";
import { useGameContext } from "@/context/GameContext";
import { Colors } from "@/constants/Colors";
import { downloadWallpaper, setWallpaper } from "@/utils/helpers";
import * as MediaLibrary from "expo-media-library";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function WallpaperAside({
  wallpaper,
  setName,
}: {
  wallpaper: Wallpapers;
  setName: string;
}) {
  const {
    state: { tilesSets },
    dispatch: storeDispatch,
  } = useStoreContext();
  const { dispatch: gameDispatch } = useGameContext();

  const setInformation = tilesSets.find((set) =>
    set.wallpapers.map((item) => item.id === set.id)
  );

  if (!setInformation) return;

  // console.log(setInformation);

  const { id, isUnlocked, isDownloaded, fileUri } = wallpaper;

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
    const fileUri = await downloadWallpaper(setInformation.setName, id);
    if (fileUri !== "" && fileUri !== undefined) {
      storeDispatch({
        type: "STORE_SET_WALLPAPER",
        payload: { setId: setInformation.id, wallpaperId: id, fileUri },
      });
    }
  };

  return (
    <View style={[styles.aside]}>
      <FontText style={styles.cardHeader}>{setName}</FontText>
      {!isUnlocked && (
        <FontText style={styles.cardAside}>
          {/* Set is unlocked at level {unlockedAt.level} difficulty{" "} */}
          {/* {unlockedAt.difficulty} */}
        </FontText>
      )}

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

      {!isUnlocked && <Button title="Buy now" color={Colors.buttonPrimary} />}
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
