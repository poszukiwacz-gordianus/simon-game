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
 * @property tileSoundIndex - The index of the tile sound to play.
 * @property isPlaying - A boolean indicating if the user is currently playing.
 * @property isSoundOn - A boolean indicating if the sound is on or off.
 * @property levelUp - A boolean indicating if the game should advance to the next level.
 * @property gameOver - A boolean indicating if the game is over.
 * @property tiles - An array of the tiles in the game.
 * @property sequence - The sequence of tiles to be shown to the user.
 * @property animationPace - The pace of animations to controll the speed of the game by difficulty.
 * @property tileSound - The function to play the tile sound.
 * @property gameOverSound - The function to play the game over sound.
 */
export interface GameState {
  readonly difficulty: "easy" | "medium" | "hard";
  readonly difficulties: Difficulties;
  level: number;
  tilesRemaining: number;
  userGuess: number;
  hints: number;
  tileSoundIndex: number;
  isPlaying: boolean;
  isSoundOn: boolean;
  levelUp: boolean;
  gameOver: boolean;
  tiles: AnimatedTile[];
  sequence: number[];
  animationPace: number;
  tileSound: (tileSoundIndex: number) => void;
  gameOverSound: (tileSoundIndex: number) => void;
}
