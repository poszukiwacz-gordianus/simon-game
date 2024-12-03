import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Colors } from "@/constants/Colors";

export default function FontText({ style, ...props }: TextProps) {
  const [fontsLoaded] = useFonts({
    DotGothic16: require("@/assets/fonts/DotGothic16-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <RNText {...props}>Loading...</RNText>;
  }

  return <RNText style={[styles.text, style]} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "DotGothic16",
    color: Colors.textPrimary,
  },
});
