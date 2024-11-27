import { createContext, useContext, useReducer } from "react";

const SettingsContext = createContext(null);

const initialState = {
  isSoundOn: true,
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SOUND":
      return {
        ...state,
        isSoundOn: !state.isSoundOn,
      };
    default:
      return state;
  }
};

export default function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider"
    );
  }
  return context;
}

export { SettingsProvider, useSettingsContext };
