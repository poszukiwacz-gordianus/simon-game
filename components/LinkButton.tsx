import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { type ButtonProps } from "@/types";
import FontText from "./FontText";

export default function LinkButton({
  title: buttonText,
  onPress: handlePress,
}: ButtonProps) {
  return (
    <Link href="/levels" onPress={handlePress} style={styles.button}>
      <FontText>{buttonText}</FontText>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    fontSize: 30,
    padding: 10,
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FEF2BF",
  },
});
