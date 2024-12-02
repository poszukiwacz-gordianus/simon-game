import { ReactNode } from "react";
import { StoreActionType } from "./storeActionTypes";
import { StoreStateType } from "./storeStateTypes";

/**
 * Hook to access the store state and dispatch function.
 *
 * This hook provides the `state` and `dispatch` objects from the
 * `StoreContext` context. This hook must be used within a `StoreProvider`
 * component.
 *
 * @throws {Error} If the hook is not used within a `StoreProvider` component.
 *
 * @returns {StoreContextType} The Store state and dispatch function.
 */
export interface StoreContextType {
  readonly state: StoreStateType;
  readonly dispatch: React.Dispatch<StoreActionType>;
}

/**
 * Reducer function for managing Store state.
 *
 * @param state - The current state of Store.
 * @param action - The action to be processed, which updates the state.
 * @returns The new state after applying the specified action.
 *
 * Action Types:
 * - "TOGGLE_SOUND": Toggles the sound setting on or off.
 */
export type StoreReducer = (
  state: StoreStateType,
  action: StoreActionType
) => StoreStateType;

/**
 * Provides the Store state and dispatch function to all children components.
 *
 * This Provider component uses the `useReducer` hook to manage the Store state.
 * It also provides the `state` and `dispatch` objects from the `StoreContext`
 * context. This Provider component must be used within a `StoreProvider`
 * component.
 *
 * @param {StoreContextProviderProps} props Component props.
 * @returns {JSX.Element} The Provider component with the Store state and
 *                        dispatch function as its value.
 */
export interface StoreContextProviderProps {
  readonly children: ReactNode;
}
