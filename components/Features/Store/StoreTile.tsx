import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

export default function StoreTile({ source }: { source: string }) {
  return (
    <View style={styles.tileContainer}>
      <Image
        style={styles.image}
        source={source}
        contentFit="fill"
        transition={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tileContainer: {
    width: "50%",
    height: "50%",
    padding: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
