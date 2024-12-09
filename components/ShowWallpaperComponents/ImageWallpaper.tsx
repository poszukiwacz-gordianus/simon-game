import { View, StyleSheet } from "react-native";
import { type ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { type Wallpapers } from "@/types/types";

export default function ImageWallpaper({
  tileImages,
  wallpapers,
  selectedWallpaperId,
}: {
  tileImages: ImageSourcePropType[];
  wallpapers: Wallpapers[];
  selectedWallpaperId: number;
}) {
  const selectedWallpaperIndex = wallpapers.findIndex(
    ({ id }) => id === selectedWallpaperId
  );

  if (selectedWallpaperIndex === -1) return null;

  const selectedTileImage = tileImages[selectedWallpaperIndex];

  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={selectedTileImage}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
