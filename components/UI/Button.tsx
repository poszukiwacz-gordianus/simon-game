import { Pressable, type StyleProp, StyleSheet, ViewStyle } from "react-native";
import FontText from "./FontText";
import { Colors } from "@/constants/Colors";

export default function Button({
  title,
  style,
  onPress,
}: {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <FontText style={styles.title}>{title}</FontText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.buttonSecondary,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
  },
});
