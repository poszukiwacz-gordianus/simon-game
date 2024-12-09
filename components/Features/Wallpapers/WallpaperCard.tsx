import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";

export default function WallpaperCard({
  imageUrl,
  id,
}: {
  imageUrl: string;
  id: number;
}) {
  return (
    <Link
      href={{
        pathname: "/showWallpaper",
        params: { id },
      }}
      style={styles.link}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={imageUrl}
          contentFit="cover"
          transition={1000}
        />
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    width: "24%",
    height: 150,
  },
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
