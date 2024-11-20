import { Button } from "react-native";
import { type GameFooterProps } from "@/types/types";

export default function GameFooter({
  showSequence,
  isPlaying,
}: GameFooterProps) {
  return <Button title={isPlaying ? "Pause" : "Play"} onPress={showSequence} />;
}
