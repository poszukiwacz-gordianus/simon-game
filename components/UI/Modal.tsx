import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { Pressable, PressableProps, StyleProp, StyleSheet } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";

export default function Modal({
  children,
  onClose = () => {},
  isBackgroundColor = true,
  isGameOver = false,
}: {
  children: ReactNode;
  onClose?: () => void;
  isBackgroundColor?: boolean;
  isGameOver?: boolean;
}) {
  return (
    <Pressable
      onPress={onClose}
      style={[
        styles.centeredView,
        isBackgroundColor && { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      ]}
    >
      <Animated.View entering={BounceIn} exiting={BounceOut}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <LinearGradient
            colors={
              isGameOver
                ? [
                    Colors.backgroundGameOver,
                    Colors.backgroundGameOver,
                    Colors.backgroundGameOverAccent,
                  ]
                : [
                    Colors.background,
                    Colors.background,
                    Colors.backgroundAccent,
                  ]
            }
            style={[styles.modalView]}
          >
            {children}
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Ensure it overlays other elements
    borderRadius: 20,
  },
  modalView: {
    padding: 20,
    marginHorizontal: 20,
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
});
