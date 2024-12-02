import { PropsWithChildren, ReactNode, useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import Modal from "./Modal";

interface IconWithPopupProps extends PropsWithChildren {
  icon: ReactNode;
  position: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

export default function IconWithPopup({
  icon,
  position,
  children,
}: IconWithPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pressable
        style={[styles.container, { ...position }]}
        onPress={() => setIsOpen(!isOpen)}
      >
        {icon}
      </Pressable>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <View style={styles.modalContent}>{children}</View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#FEF2BF",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    gap: 20,
    alignItems: "center",
    padding: 20,
  },
});