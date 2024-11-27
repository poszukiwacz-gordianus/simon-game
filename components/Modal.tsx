import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";

export default function Modal({
  children,
  onClose = () => {},
}: {
  children: ReactNode;
  onClose?: () => void;
}) {
  return (
    <Pressable style={styles.centeredView} onPress={onClose}>
      <Animated.View entering={BounceIn} exiting={BounceOut}>
        <Pressable
          style={styles.modalView}
          onPress={(e) => e.stopPropagation()}
        >
          {children}
        </Pressable>
      </Animated.View>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    zIndex: 10, // Ensure it overlays other elements
  },
  modalView: {
    backgroundColor: "#FEF2BF",
    padding: 20,
    marginHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
