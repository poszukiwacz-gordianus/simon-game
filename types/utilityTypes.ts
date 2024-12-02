import { type Animated } from "react-native";
import {
  type GameActionType,
  type AnimatedTile,
  type Difficulties,
  type LoadGameState,
  type StoreStateType,
  type StoreActionType,
} from "@/types/types";

export type LoadState = LoadGameState | StoreStateType;

/**
 * Loads the tiles set from storage and returns an array of AnimatedTile objects with
 * the correct image sources.
 *
 * @param {StoreStateType} storeState The state of the store, containing the tiles sets.
 * @param {AnimatedTile[]} defaultTilesSet The default tiles set to return if no tiles set is
 *                                          found in the store state.
 * @returns {AnimatedTile[]} The tiles set with the correct image sources.
 */
export type LoadTiles = (
  storeState: StoreStateType,
  defaultTilesSet: AnimatedTile[]
) => AnimatedTile[];

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
  gameState: { difficulties: Difficulties; bestScore: number } | StoreStateType
) => void;

/**
 * Loads state from persistent storage.
 *
 * This function takes a key, a dispatch function, a type, and a default state.
 * It attempts to load the state from AsyncStorage using the provided key. If
 * the state is found, it is parsed as JSON and passed to the dispatch function
 * as the payload of an action. If the state is not found, the default state is
 * used. If there is an error, the error is logged to the console.
 *
 * @param {string} key - The key under which the state is stored.
 * @param {React.Dispatch<GameActionType | StoreActionType>} dispatch - The
 *     dispatch function to use when loading the state.
 * @param {string} type - The type of the action to dispatch. Must be either
 *     "LOAD_GAME_STATE" or "LOAD_STORE_STATE".
 * @param {LoadGameState | StoreStateType} defaultState - The default
 *     state to use if no state is found in storage.
 */
export type LoadStateFromStorageProps = {
  (
    key: "gameState",
    dispatch: React.Dispatch<GameActionType>,
    type: "LOAD_GAME_STATE",
    defaultState: LoadGameState
  ): Promise<any>;
  (
    key: "storeState",
    dispatch: React.Dispatch<StoreActionType>,
    type: "LOAD_STORE_STATE",
    defaultState: StoreStateType
  ): Promise<any>;
};

/**
 * Clears all animation timeouts and resets the timeouts array.
 *
 * @param {React.MutableRefObject<number[]>} ref - The timeouts reference.
 */
export type StopTilesAnimationProps = (
  ref: React.MutableRefObject<number[]>,
  tiles: AnimatedTile[]
) => void;
