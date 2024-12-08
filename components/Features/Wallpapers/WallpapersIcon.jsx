import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function WallpapersIcon() {
  return (
    <Link href="/wallpapers" style={styles.container}>
      <View style={styles.centerIcon}>
        <Ionicons
          name="diamond"
          size={24}
          color={Colors.buttonPrimary}
          style={{ alignSelf: "center", alignItems: "center" }}
        />
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
    top: 280,
    right: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  centerIcon: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
