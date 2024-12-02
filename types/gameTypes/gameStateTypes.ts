import { MutableRefObject } from "react";
import { AnimatedTile } from "../componentTypes";
import { Audio } from "expo-av";

/**
 * The shape of the game state.
 */
export interface DifficultyState {
  /**
   * The current level for the difficulty.
   */

  level: number;
}

export type Difficulty = "easy" | "medium" | "hard";

export interface Difficulties {
  easy: DifficultyState;
  medium: DifficultyState;
  hard: DifficultyState;
}

export interface LoadGameState {
  difficulties: Difficulties;
  bestScore: number;
  tileSoundIndex: number;
}

export type GenerateTileSequence = (
  length: number,
  prevSequence: number[],
  tiles: AnimatedTile[],
  animationPace: number,
  tileSound: (tileIndex: number) => void,
  tileSoundIndex: number,
  isSoundOn: boolean,
  isInfiniteMode: boolean
) => number[];

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
 * @property bestScore - The best score achieved by the user in infinite mode.
 * @property isAppActive - A boolean indicating if the app is active.
 * @property isPlaying - A boolean indicating if the user is currently playing.
 * @property isSoundOn - A boolean indicating if the sound is on or off.
 * @property levelUp - A boolean indicating if the game should advance to the next level.
 * @property gameOver - A boolean indicating if the game is over.
 * @property isInfiniteMode - A boolean indicating if the game is in infinite mode.
 * @property isNewBestScore - A boolean indicating if is a new best score.
 * @property tiles - An array of the tiles in the game.
 * @property sequence - The sequence of tiles to be shown to the user.
 * @property animationPace - The pace of animations to controll the speed of the game by difficulty.
 * @property timeoutRefs - A ref object for the timeouts.
 */
export interface GameState {
  readonly difficulty: Difficulty;
  readonly difficulties: Difficulties;
  level: number;
  tilesRemaining: number;
  userGuess: number;
  hints: number;
  tileSoundIndex: number;
  bestScore: number;
  isAppActive: boolean;
  isPlaying: boolean;
  isSoundOn: boolean;
  levelUp: boolean;
  gameOver: boolean;
  isInfiniteMode: boolean;
  isNewBestScore: boolean;
  tiles: AnimatedTile[];
  sequence: number[];
  tilesSounds: Audio.Sound[];
  animationPace: number;
  timeoutRefs: MutableRefObject<number[]>;
}
