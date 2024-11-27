import { type Animated } from "react-native";
import {
  type GameActionType,
  type AnimatedTile,
  type Difficulties,
} from "@/types/types";

/**
 * Animates a tile's opacity from 1 to 0.1 and back to 1.
 *
 * @param tileOpacity The animated value for the tile's opacity.
 */
export type AnimatedTileProps = (
  tileOpacity: Animated.Value,
  pace: number
) => void;

/**
 * Saves the game state to persistent storage.
 *
 * This function uses AsyncStorage to store the current difficulties
 * under a specified key. If the operation fails, an error is logged
 * to the console.
 *
 * @param {string} key - The key under which to store the game state.
 * @param {Difficulties} difficulties - The game state to store.
 */
export type SaveGameStateToStorageProps = (
  key: string,
  difficulties: Difficulties
) => void;

/**
 * Loads the game state from storage and dispatches the initial state of the game.
 *
 * If the load fails, the default state will be used.
 *
 * @param {string} key - The key used to store and load the game state.
 * @param {React.Dispatch<GameActionType>} dispatch - The dispatch function from the
 *                                            `GameContext` context.
 * @param {Difficulties} defaultState - The default state to use if the load fails.
 */
export type LoadGameStateFromStorageProps = (
  key: string,
  dispatch: React.Dispatch<GameActionType>,
  defaultState: Difficulties
) => void;

/**
 * Clears all animation timeouts and resets the timeouts array.
 *
 * @param {React.MutableRefObject<number[]>} ref - The timeouts reference.
 */
export type StopTilesAnimationProps = (
  ref: React.MutableRefObject<number[]>,
  tiles: AnimatedTile[]
) => void;
