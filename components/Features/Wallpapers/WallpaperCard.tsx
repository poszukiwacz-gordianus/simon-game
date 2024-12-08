import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Wallpapers } from "@/types/types";
import WallpaperAside from "./WallpaperAside";

export default function WallpaperCard({
  item: { tile, wallpaper },
}: {
  item: { tile: string; wallpaper: Wallpapers };
}) {
  return (
    <View style={styles.tileContainer}>
      <Image
        style={styles.image}
        source={tile}
        contentFit="fill"
        transition={1000}
      />
      <WallpaperAside wallpaper={wallpaper} />
    </View>
  );
}

const styles = StyleSheet.create({
  tileContainer: {
    width: "49%",
    height: 350,
    padding: 0.5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
