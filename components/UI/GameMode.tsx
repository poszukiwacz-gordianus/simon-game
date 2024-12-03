import { ReactNode, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useGameContext } from "@/context/GameContext";
import DifficultyChoice from "./DifficultyChoice";
import { Colors } from "@/constants/Colors";

export default function GameMode({
  isInfiniteMode,
  children,
}: {
  isInfiniteMode: boolean;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useGameContext();
  return (
    <>
      <Pressable
        onPress={() => {
          setIsOpen(true);
          dispatch({ type: "GAME_SET_INFINITE_MODE", payload: isInfiniteMode });
        }}
      >
        {children}
      </Pressable>

      {isOpen && <DifficultyChoice onClose={() => setIsOpen(false)} />}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    fontSize: 30,
    padding: 10,
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
  },
});
