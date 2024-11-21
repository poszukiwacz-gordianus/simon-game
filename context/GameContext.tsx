import {
  type GameContextType,
  type GameContextProviderProps,
  type GameState,
  type GenerateSequence,
  type AnimatedTile,
  type GameReducer,
} from "@/types/types";
import { createContext, useContext, useEffect, useReducer } from "react";
import { Animated, useAnimatedValue } from "react-native";

const GameContext = createContext<GameContextType | null>(null);

const initialState: GameState = {
  difficulty: "easy",
  difficulties: {
    easy: { level: 10 },
    medium: { level: 5 },
    hard: { level: 1 },
  },
  level: 1,
  toGo: 1,
  userGuess: 0,
  hints: 3,
  gameInProgress: false,
  isPlaying: false,
  levelUp: false,
  gameOver: false,
  tiles: [],
  sequence: [],
};

export const reducer: GameReducer = (state, action) => {
  const animateTile: AnimatedTile = (tileOpacity: Animated.Value) => {
    Animated.sequence([
      Animated.timing(tileOpacity, {
        toValue: 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(tileOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const generateSequence: GenerateSequence = (previousSequence = []) => {
    const sequenceLength = state.level;
    const newSequence = previousSequence.length === 0;

    return Array.from({ length: sequenceLength }, (_, index) => {
      const sequenceItem = newSequence
        ? Math.floor(Math.random() * 4)
        : previousSequence[index];

      setTimeout(() => {
        const tileIndex = sequenceItem;
        animateTile(state.tiles[tileIndex].opacity);
      }, 500 * (index + 1));

      return sequenceItem;
    });
  };

  switch (action.type) {
    case "loadTiles":
      return { ...state, tiles: action.payload };

    case "difficulty":
      return { ...state, difficulty: action.payload };

    case "setLevel":
      return {
        ...state,
        level: action.payload,
        toGo: action.payload,
        userGuess: 0,
        hints: 3,
        isPlaying: false,
        gameInProgress: false,
        gameOver: false,
      };

    case "startLevel":
      const sequence = generateSequence(state.sequence);
      return { ...state, sequence };

    case "startPlay":
      return { ...state, gameInProgress: true, isPlaying: true };

    case "nextLevel":
      return { ...state, levelUp: false };

    case "showHint":
      animateTile(state.tiles[state.sequence[state.userGuess]].opacity);
      return { ...state, hints: state.hints - 1 };

    case "resetLevel":
      return {
        ...state,
        hints: 3,
        userGuess: 0,
        toGo: state.level,
        gameInProgress: false,
        gameOver: false,
      };

    case "verifyUserResponse":
      if (
        state.userGuess < state.sequence.length - 1 &&
        action.payload === state.sequence.at(state.userGuess)
      )
        return {
          ...state,
          toGo: state.toGo - 1,
          userGuess: state.userGuess + 1,
        };

      if (
        state.userGuess === state.sequence.length - 1 &&
        action.payload === state.sequence.at(state.userGuess)
      )
        return {
          ...state,
          toGo: state.level + 1,
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
      return { ...state, gameOver: true };

    default:
      return state;
  }
};

function GameProvider({ children }: GameContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const opacity = useAnimatedValue(1);

  const tiles = [
    { color: "blue", opacity },
    { color: "yellow", opacity },
    { color: "red", opacity },
    { color: "white", opacity },
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

function useGameContext(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}

export { GameProvider, useGameContext };
