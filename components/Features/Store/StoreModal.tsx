import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function StoreModal() {
  return (
    <Link href="/store" style={styles.container}>
      <View style={styles.centerIcon}>
        <Ionicons
          name="storefront"
          size={24}
          color="#000"
          style={{ alignSelf: "center", alignItems: "center" }}
        />
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#FEF2BF",
    width: 50,
    height: 50,
    top: 200,
    right: 20,
  },
  centerIcon: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
