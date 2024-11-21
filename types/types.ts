import { ReactNode } from "react";
import { Animated } from "react-native";

export type RulesContent = Array<string>;

export interface ButtonProps {
  title: string;
  onPress: () => void;
}

export interface TileProps {
  color: string;
  opacity: Animated.Value;
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
   * The current level
   */
  level: number;

  /**
   * The number of levels to go.
   */
  togo: number;

  /**
   * Track user guess
   */
  userGuess: number;

  /**
   * The number of hints remaining.
   */
  hints: number;

  /**
   * Whether the game is currently playing.
   */
  isPlaying: boolean;

  /**
   * Whether the game is in progress.
   */
  gameInProgress: boolean;

  /**
   * Whether the level has been completed.
   */
  levelUp: boolean;

  /**
   * Whether the game is over.
   */
  gameOver: boolean;

  /**
   * The tiles to animate.
   */
  tiles: TileProps[];

  /**
   * The sequence of tiles to track user input.
   */
  sequence: number[];
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

export interface LoadTilesAction {
  type: "loadTiles";
  payload: TileProps[];
}

export interface SetLevelAction {
  type: "setLevel";
  payload: number;
}

export interface StartLevelAction {
  type: "startLevel";
}

export interface GameInProgressAction {
  type: "gameInProgress";
}

export interface StartPlayAction {
  type: "startPlay";
}

export interface NextLevelAction {
  type: "nextLevel";
}

export interface ShowHintAction {
  type: "showHint";
}

export interface ResetLevelAction {
  type: "resetLevel";
}

export interface VerifyUserResponseAction {
  type: "verifyUserResponse";
  payload: number;
}

/**
 * The type of all possible actions.
 */
export type Action =
  | DifficultyAction
  | LoadTilesAction
  | StartLevelAction
  | GameInProgressAction
  | SetLevelAction
  | StartPlayAction
  | NextLevelAction
  | ShowHintAction
  | ResetLevelAction
  | VerifyUserResponseAction;
