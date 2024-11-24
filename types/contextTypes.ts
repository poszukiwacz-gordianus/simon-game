import { type ReactNode } from "react";
import { type Action } from "./actionTypes";
import { type GameState } from "./gameStateTypes";

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

  timeoutRefs: React.MutableRefObject<number[]>;

  stopAnimation: () => void;
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
export type GameReducer = (state: GameState, action: Action) => GameState;
