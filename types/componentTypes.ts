import { type Animated } from "react-native";

export type RulesContent = Array<string>;

export interface ButtonProps {
  title: string;
  onPress: () => void;
}

export interface AnimatedTile {
  color: string;
  opacity: Animated.Value;
}

export interface RuleProps {
  rule: string;
  index: number;
}
