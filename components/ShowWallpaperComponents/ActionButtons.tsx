import * as MediaLibrary from "expo-media-library";
import { useStoreContext } from "@/context/StoreContext";
import { setWallpaper, downloadWallpaper } from "@/utils/helpers";

import Button from "../UI/Button";
import ButtonBuyWallpaper from "./ButtonBuyWallpaper";
import { type TileSet } from "@/types/types";

export default function ActionButtons({
  tileSet,
  wallpaperId,
}: {
  tileSet: TileSet;
  wallpaperId: number;
}) {
  const { dispatch: storeDispatch } = useStoreContext();

  const { setName, id: setId, wallpapers } = tileSet;

  const wallpaper = wallpapers.find(
    (wallpaper) => wallpaper.id === wallpaperId
  );

  if (!wallpaper) return null;

  const { isUnlocked, isDownloaded, fileUri: wallpaperFileUri } = wallpaper;

  const handleDownload = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const downloadedFileUri = await downloadWallpaper(setName, wallpaperId);

    if (downloadedFileUri) {
      storeDispatch({
        type: "STORE_SET_WALLPAPER",
        payload: { setId, wallpaperId, fileUri: downloadedFileUri },
      });
    }
  };

  if (isUnlocked && !isDownloaded)
    return <Button title="Download" onPress={handleDownload} />;

  if (isDownloaded)
    return (
      <Button
        title="Set wallpaper"
        onPress={() => setWallpaper(wallpaperFileUri)}
      />
    );

  if (!isUnlocked)
    return <ButtonBuyWallpaper setId={setId} wallpaperId={wallpaperId} />;
}
