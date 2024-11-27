import { ReactNode } from "react";
import { SettingsActionType } from "./settingsActionTypes";
import { SettingsStateType } from "./settingsStateTypes";

/**
 * Hook to access the settings state and dispatch function.
 *
 * This hook provides the `state` and `dispatch` objects from the
 * `SettingsContext` context. This hook must be used within a `SettingsProvider`
 * component.
 *
 * @throws {Error} If the hook is not used within a `SettingsProvider` component.
 *
 * @returns {SettingsContextType} The settings state and dispatch function.
 */
export interface SettingsContextType {
  readonly state: SettingsStateType;
  readonly dispatch: React.Dispatch<SettingsActionType>;
}

/**
 * Reducer function for managing settings state.
 *
 * @param state - The current state of settings.
 * @param action - The action to be processed, which updates the state.
 * @returns The new state after applying the specified action.
 *
 * Action Types:
 * - "TOGGLE_SOUND": Toggles the sound setting on or off.
 */
export type SettingsReducer = (
  state: SettingsStateType,
  action: SettingsActionType
) => SettingsStateType;

/**
 * Provides the settings state and dispatch function to all children components.
 *
 * This Provider component uses the `useReducer` hook to manage the settings state.
 * It also provides the `state` and `dispatch` objects from the `SettingsContext`
 * context. This Provider component must be used within a `SettingsProvider`
 * component.
 *
 * @param {SettingsContextProviderProps} props Component props.
 * @returns {JSX.Element} The Provider component with the settings state and
 *                        dispatch function as its value.
 */
export interface SettingsContextProviderProps {
  readonly children: ReactNode;
}
