import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { type WallpaperProps } from "@/types/types";
import WallpaperAside from "./WallpaperAside";
import { Link } from "expo-router";

export default function WallpaperCard({ item }: { item: WallpaperProps }) {
  return (
    <Link
      href={{
        pathname: "/showWallpaper",
        params: { id: item.wallpaper.id },
      }}
      style={{ width: "24%", height: 150 }}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={item.tile}
          contentFit="cover"
          transition={1000}
        />
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderWidth: 1,
    overflow: "hidden", // Android clipping fix
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
