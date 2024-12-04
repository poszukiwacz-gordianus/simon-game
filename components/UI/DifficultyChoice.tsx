import { useGameContext } from "@/context/GameContext";
import { type Difficulty } from "@/types/types";
import LinkButton from "./LinkButton";
import Modal from "./Modal";
import useInitializeLevelSequence from "@/hooks/useInitializeLevelSequence";

const choices: { text: string; payload: Difficulty }[] = [
  { text: "Slow", payload: "easy" },
  { text: "Medium", payload: "medium" },
  { text: "Fast", payload: "hard" },
];

export default function DifficultyChoice({ onClose }: { onClose: () => void }) {
  const { initializeLevelSequence } = useInitializeLevelSequence();

  const {
    state: { isInfiniteMode, animationPace },
    dispatch,
  } = useGameContext();

  return (
    <Modal onClose={onClose}>
      {choices.map((choice) => (
        <LinkButton
          key={choice.payload}
          href={isInfiniteMode ? "/game" : "/levels"}
          buttonText={choice.text}
          onPress={() => {
            dispatch({ type: "GAME_SET_DIFFICULTY", payload: choice.payload });
            isInfiniteMode && initializeLevelSequence(0, animationPace);
            onClose();
          }}
        />
      ))}
    </Modal>
  );
}
