import {
  type GameContextType,
  type Action,
  type GameContextProviderProps,
  type GameState,
} from "@/types/types";
import { createContext, useContext, useEffect, useReducer } from "react";
import { Animated, useAnimatedValue } from "react-native";

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
  level: 1,
  togo: 1,
  userGuess: 0,
  hints: 3,
  gameInProgress: false,
  isPlaying: false,
  levelUp: false,
  gameOver: false,
  tiles: [],
  sequence: [],
};

/**
 * The reducer function for the game state.
 *
 * @param state The current state.
 * @param action The action to apply.
 * @returns The new state.
 */
export function reducer(state: GameState, action: Action): GameState {
  const animateTile = (animatedValue: Animated.Value) => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const showSequence = () => {
    const sequence: number[] = [];
    for (let index = 1; index <= state.level; index++) {
      const random = Math.floor(Math.random() * 4);
      sequence.push(random);
      setTimeout(() => {
        switch (random) {
          case 0:
            animateTile(state.tiles[0].opacity);
            break;
          case 1:
            animateTile(state.tiles[1].opacity);
            break;
          case 2:
            animateTile(state.tiles[2].opacity);
            break;
          default:
            animateTile(state.tiles[3].opacity);
            break;
        }
      }, 500 * index);
    }
    return sequence;
  };

  switch (action.type) {
    case "loadTiles":
      return {
        ...state,
        tiles: action.payload,
      };
    case "difficulty":
      return {
        ...state,
        difficulty: action.payload,
      };
    case "setLevel":
      return {
        ...state,
        level: action.payload,
        togo: action.payload,
        userGuess: 0,
        hints: 3,
        isPlaying: false,
        gameInProgress: false,
        gameOver: false,
      };
    case "startLevel":
      const sequence = showSequence();
      return {
        ...state,
        sequence,
      };
    case "gameInProgress":
      return { ...state, gameInProgress: true };
    case "startPlay":
      return {
        ...state,
        isPlaying: true,
      };
    case "nextLevel":
      return {
        ...state,
        levelUp: false,
      };
    case "showHint":
      animateTile(state.tiles[state.sequence[state.userGuess]].opacity);
      return {
        ...state,
        hints: state.hints - 1,
      };
    case "resetLevel":
      return {
        ...state,
        hints: 3,
        userGuess: 0,
        togo: state.level,
        gameInProgress: false,
      };
    case "verifyUserResponse":
      if (
        state.userGuess < state.sequence.length - 1 &&
        action.payload === state.sequence.at(state.userGuess)
      )
        return {
          ...state,
          togo: state.togo - 1,
          userGuess: state.userGuess + 1,
        };

      if (
        state.userGuess === state.sequence.length - 1 &&
        action.payload === state.sequence.at(state.userGuess)
      )
        return {
          ...state,
          togo: state.level + 1,
          level: state.level + 1,
          userGuess: 0,
          hints: 3,
          sequence: [],
          isPlaying: false,
          levelUp: true,
          gameInProgress: false,
          difficulties: {
            ...state.difficulties,
            [state.difficulty]: {
              ...state.difficulties[state.difficulty],
              level: state.level + 1,
            },
          },
        };
      return {
        ...state,
        gameOver: true,
      };
    default:
      return state;
  }
}

function GameProvider({ children }: GameContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const blueTile = useAnimatedValue(1);
  const yellowTile = useAnimatedValue(1);
  const redTile = useAnimatedValue(1);
  const whiteTile = useAnimatedValue(1);

  const tiles = [
    { color: "blue", opacity: blueTile },
    { color: "yellow", opacity: yellowTile },
    { color: "red", opacity: redTile },
    { color: "white", opacity: whiteTile },
  ];

  useEffect(() => {
    dispatch({ type: "loadTiles", payload: tiles });
  }, []);

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
