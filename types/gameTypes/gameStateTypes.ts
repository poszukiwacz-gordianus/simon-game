import { AnimatedTile } from "../componentTypes";

/**
 * The shape of the game state.
 */
export interface DifficultyState {
  /**
   * The current level for the difficulty.
   */

  level: number;
}

export interface Difficulties {
  easy: DifficultyState;
  medium: DifficultyState;
  hard: DifficultyState;
}

/**
 * The initial state of the game.
 *
 * @property difficulty - The selected difficulty, either "easy", "medium", or "hard".
 * @property difficulties - An object with the number of levels for each difficulty.
 * @property level - The current level of the game.
 * @property tilesRemaining - The number of sequences to be shown to the user.
 * @property userGuess - The current guess of the user.
 * @property hints - The number of hints left for the user.
 * @property isPlaying - A boolean indicating if the user is currently playing.
 * @property isSoundOn - A boolean indicating if the sound is on or off.
 * @property levelUp - A boolean indicating if the game should advance to the next level.
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
  readonly difficulties: Difficulties;

  /**
   * The current level the player is on.
   */
  level: number;

  /**
   * The number of levels remaining.
   */
  tilesRemaining: number;

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
   * Indicates if the sound is on or off.
   */
  isSoundOn: boolean;

  /**
   * Indicates if the game should advance to the next level.
   */
  levelUp: boolean;

  /**
   * Indicates if the game is over.
   */
  gameOver: boolean;

  /**
   * The list of tiles available to animate.
   */
  tiles: AnimatedTile[];

  /**
   * The sequence of tile indices to track user input.
   */
  sequence: number[];

  /**
   * The pace of animations to controll the speed of the game by difficulty.
   */
  animationPace: number;

  tileSound: () => void;

  gameOverSound: () => void;
}
