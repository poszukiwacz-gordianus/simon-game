import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { type ButtonProps } from "@/types/types";

export default function LinkButton({
  title: buttonText,
  onPress: handlePress,
}: ButtonProps) {
  return (
    <Link href="/levels" onPress={handlePress} style={styles.button}>
      {buttonText}
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    borderRadius: 9999,
    backgroundColor: "#FEF2BF",
  },
});
