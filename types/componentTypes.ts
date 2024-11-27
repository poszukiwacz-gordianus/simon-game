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

/**
 * Generates a sequence of tile indices for the current game level.
 *
 * @param length - A number representing the current level.
 * @returns An array of numbers representing the sequence of tiles to guess by user.
 */
export type GenerateTileSequenceProps = (
  level: number,
  prevSequence: number[],
  tiles: AnimatedTile[],
  animationPace: number,
  tileSound: () => void,
  isSoundOn: boolean
) => number[];
