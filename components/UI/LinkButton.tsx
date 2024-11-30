import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { type ButtonProps } from "@/types/types";
import FontText from "./FontText";

export default function LinkButton({ buttonText, href, onPress }: ButtonProps) {
  return (
    <Link href={href} onPress={onPress} style={styles.button}>
      <FontText>{buttonText}</FontText>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    padding: 10,
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: "#c2a664",
  },
});
