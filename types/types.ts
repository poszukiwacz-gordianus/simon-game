import { Animated } from "react-native";

export type Rules = Array<string>;

export interface ButtonProps {
  title: string;
  onPress: () => void;
}

export interface GameFooterProps {
  showSequence: () => void;
  isPlaying: boolean;
}

export interface TileProps {
  color: string;
  square: Animated.Value;
  isPlaying: boolean;
}

export interface TilesContainerProps {
  tiles: { color: string; square: Animated.Value }[];
  isPlaying: boolean;
}

export interface RuleProps {
  rule: string;
  index: number;
}
