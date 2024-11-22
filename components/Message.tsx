import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type MessageProps } from "@/types/types";

export default function Message({
  messageText,
  onPressHandler,
  buttonText,
  backgroundColor,
  primaryColor,
  secondaryColor,
}: MessageProps) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{messageText}</Text>
      <Pressable
        style={[styles.buttonContainer, { backgroundColor: primaryColor }]}
        onPress={onPressHandler}
      >
        <Text style={styles.button}>{buttonText}</Text>
      </Pressable>
      <Link
        href="/"
        style={[styles.buttonContainer, { backgroundColor: secondaryColor }]}
      >
        <Text style={styles.button}>Home</Text>
      </Link>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 30,
    marginBottom: 40,
  },
  buttonContainer: {
    padding: 20,
    width: 200,
    marginBottom: 10,
  },
  button: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    padding: 10,
  },
});