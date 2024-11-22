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

/**
 * The initial state of the game.
 *
 * @property difficulty - The selected difficulty, either "easy", "medium", or "hard".
 * @property difficulties - An object with the number of levels for each difficulty.
 * @property level - The current level of the game.
 * @property toGo - The number of sequences to be shown to the user.
 * @property userGuess - The current guess of the user.
 * @property hints - The number of hints left for the user.
 * @property gameInProgress - A boolean indicating if the game is in progress.
 * @property isPlaying - A boolean indicating if the user is currently playing.
 * @property levelUp - A boolean indicating if the user has leveled up.
 * @property gameOver - A boolean indicating if the game is over.
 * @property tiles - An array of the tiles in the game.
 * @property sequence - The sequence of tiles to be shown to the user.
 * @property animationPace - The pace of animations to controll the speed of the game by difficulty.
 */
export interface GameState {
  /**
   * The game difficulty level.
   */
  readonly difficulty: "easy" | "medium" | "hard";

  /**
   * The state configurations for each difficulty level.
   */
  readonly difficulties: {
    easy: DifficultyState;
    medium: DifficultyState;
    hard: DifficultyState;
  };

  /**
   * The current level the player is on.
   */
  level: number;

  /**
   * The number of levels remaining.
   */
  toGo: number;

  /**
   * The user's current guess in the sequence.
   */
  userGuess: number;

  /**
   * The number of hints the player can use.
   */
  hints: number;

  /**
   * Indicates if the game is currently being played.
   */
  isPlaying: boolean;

  /**
   * Indicates if the game is actively in progress.
   */
  gameInProgress: boolean;

  /**
   * Indicates if the player has completed the current level.
   */
  levelUp: boolean;

  /**
   * Indicates if the game is over.
   */
  gameOver: boolean;

  /**
   * The list of tiles available to animate.
   */
  tiles: TileProps[];

  /**
   * The sequence of tile indices to track user input.
   */
  sequence: number[];

  /**
   * The pace of animations to controll the speed of the game by difficulty.
   */
  animationPace: number;
}

/**
 * Hook to access the game state and dispatch function.
 *
 * This hook provides the `state` and `dispatch` objects from the
 * `GameContext` context. This hook must be used within a `GameProvider`
 * component.
 *
 * @throws {Error} If the hook is not used within a `GameProvider` component.
 *
 * @returns {GameContextType} The game state and dispatch function.
 */
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
 * The reducer function for the game state.
 *
 * @param state The current state.
 * @param action The action to apply.
 * @returns The new state.
 */
export type GameReducer = (state: GameState, action: Action) => GameState;

/**
 * Provides the game state and dispatch function to all children components.
 *
 * This Provider component uses the `useReducer` hook to manage the game state.
 * It also loads the initial tiles into the state using the `useEffect` hook
 * when the component mounts.
 *
 * @param {GameContextProviderProps} props Component props.
 * @returns {JSX.Element} The Provider component with the game state and
 *                        dispatch function as its value.
 */
export interface GameContextProviderProps {
  /**
   * The children to be rendered inside the provider.
   */
  readonly children: ReactNode;
}

/**
 * Animates a tile's opacity from 1 to 0.5 and back to 1.
 *
 * @param tileOpacity The animated value for the tile's opacity.
 */
export type AnimatedTile = (tileOpacity: Animated.Value) => void;

/**
 * Generates a sequence of tile indices for the current game level.
 *
 * @param previousSequence - An optional array representing the previous sequence.
 *                           If not provided or empty, a new sequence is generated.
 * @returns An array of numbers representing the sequence of tiles to guess by user.
 */
export type GenerateSequence = (previousSequence?: number[]) => number[];

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

export interface LoadGameState {
  type: "loadGameState";
  payload: GameState["difficulties"] | null;
}

/**
 * The type of all possible actions.
 */
export type Action =
  | DifficultyAction
  | LoadTilesAction
  | StartLevelAction
  | SetLevelAction
  | StartPlayAction
  | NextLevelAction
  | ShowHintAction
  | ResetLevelAction
  | LoadGameState
  | VerifyUserResponseAction;
