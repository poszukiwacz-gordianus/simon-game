import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function BackgroundColor({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LinearGradient
      colors={[Colors.background, Colors.background, Colors.backgroundAccent]}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
