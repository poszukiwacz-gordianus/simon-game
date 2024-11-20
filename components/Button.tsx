import { ButtonProps } from "@/types/types";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <Link href="/levels" onPress={onPress} style={styles.button}>
      {title}
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
