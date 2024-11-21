import { ReactNode } from "react";
import { Animated } from "react-native";

export type RulesContent = Array<string>;

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
  tile: Animated.Value;
  isPlaying: boolean;
}

export interface TilesContainerProps {
  tiles: { color: string; tile: Animated.Value }[];
  isPlaying: boolean;
}

export interface RuleProps {
  rule: string;
  index: number;
}

// GameContext types
/**
 * The shape of the game state.
 */

export interface DifficultyState {
  /**
   * The current level for the difficulty.
   */

  level: number;
}

export interface GameState {
  /**
   * The game difficulty, or undefined if not set.
   */
  readonly difficulty: "easy" | "medium" | "hard";

  /**
   * The state for each difficulty.
   */
  readonly difficulties: {
    easy: DifficultyState;
    medium: DifficultyState;
    hard: DifficultyState;
  };

  /**
   * The number of levels to go.
   */
  togo: number;

  /**
   * The number of hints remaining.
   */
  hints: number;

  /**
   * Whether the game is currently playing.
   */
  isPlaying: boolean;
}

export interface GameContextType {
  /**
   * The current state of the game.
   */
  readonly state: GameState;

  /**
   * The function to dispatch an action to the reducer.
   */
  readonly dispatch: React.Dispatch<Action>;
}

/**
 * Props for the GameProvider component.
 */
export interface GameContextProviderProps {
  /**
   * The children to be rendered inside the provider.
   */
  readonly children: ReactNode;
}

/**
 * An action to set the game difficulty.
 */
export interface DifficultyAction {
  /**
   * The type of the action.
   */
  readonly type: "difficulty";

  /**
   * The difficulty to set.
   */
  readonly payload: "easy" | "medium" | "hard";
}

/**
 * The type of all possible actions.
 */
export type Action = DifficultyAction;
