import {
  GameContextType,
  type Action,
  type GameContextProviderProps,
  type GameState,
} from "@/types/types";
import { createContext, useContext, useReducer } from "react";

/**
 * The context for the game state.
 */
const GameContext = createContext<GameContextType | null>(null);

/**
 * The initial state of the game.
 */
const initialState: GameState = {
  difficulty: "easy",
  difficulties: {
    easy: { level: 10 },
    medium: { level: 5 },
    hard: { level: 1 },
  },
  togo: 1,
  hints: 3,
  isPlaying: false,
};

/**
 * The reducer function for the game state.
 *
 * @param state The current state.
 * @param action The action to apply.
 * @returns The new state.
 */
export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "difficulty":
      return {
        ...state,
        difficulty: action.payload,
      };
    default:
      return state;
  }
}

function GameProvider({ children }: GameContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}

export { GameProvider, useGameContext };
