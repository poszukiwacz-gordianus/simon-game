import { type ReactNode } from "react";
import { type GameState } from "./gameStateTypes";
import { type GameActionType } from "./gameActionTypes";

export interface GameContextType {
  /**
   * The current state of the game.
   */
  readonly state: GameState;

  /**
   * The function to dispatch an action to the reducer.
   */
  readonly dispatch: React.Dispatch<GameActionType>;
}

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
 * The reducer function for the game state.
 *
 * @param state The current state.
 * @param action The action to apply.
 * @returns The new state.
 */
export type GameReducer = (
  state: GameState,
  action: GameActionType
) => GameState;
