import { useGameContext } from "@/context/GameContext";
import LinkButton from "./LinkButton";
import Modal from "./Modal";
import { type Difficulty } from "@/types/types";
import useInitializeLevelSequence from "@/hooks/useInitializeLevelSequence";

const choices: { text: string; payload: Difficulty }[] = [
  { text: "Easy", payload: "easy" },
  { text: "Medium", payload: "medium" },
  { text: "Hard", payload: "hard" },
];

export default function DifficultyChoice({ onClose }: { onClose: () => void }) {
  const {
    state: { isInfiniteMode },
    dispatch,
  } = useGameContext();
  const { initializeLevelSequence } = useInitializeLevelSequence();

  return (
    <Modal onClose={onClose}>
      {choices.map((choice) => (
        <LinkButton
          key={choice.payload}
          href={isInfiniteMode ? "/game" : "/levels"}
          buttonText={choice.text}
          onPress={() => {
            dispatch({ type: "SET_DIFFICULTY", payload: choice.payload });
            isInfiniteMode && initializeLevelSequence(1);
          }}
        />
      ))}
    </Modal>
  );
}
