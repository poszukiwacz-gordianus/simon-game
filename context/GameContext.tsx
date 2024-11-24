import { createContext, useContext, useEffect, useReducer } from "react";
import { Animated, useAnimatedValue } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ANIMATION_PACE_DEFAULT,
  ANIMATION_PACE_HARD,
  ANIMATION_PACE_MEDIUM,
  DEFAULT_DIFFICULTY,
  HINTS,
  LEVELS,
} from "@/config";
import {
  type GameContextType,
  type GameContextProviderProps,
  type GameState,
  type GenerateSequence,
  type AnimatedTile,
  type GameReducer,
} from "@/types/types";
import useStartLevel from "@/hooks/useStartLevel";

const GameContext = createContext<GameContextType | null>(null);

const initialState: GameState = {
  difficulty: DEFAULT_DIFFICULTY,
  difficulties: {
    easy: { level: 1 },
    medium: { level: 1 },
    hard: { level: 1 },
  },
  level: 1,
  toGo: 1,
  userGuess: 0,
  hints: HINTS,
  isPlaying: false,
  levelUp: false,
  gameOver: false,
  tiles: [],
  sequence: [],
  animationPace: ANIMATION_PACE_DEFAULT,
};

const saveToStorage = async (state: any) => {
  try {
    await AsyncStorage.setItem("gameState", JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save game state", e);
  }
};

export const reducer: GameReducer = (state, action) => {
  const animateTile: AnimatedTile = (tileOpacity) => {
    Animated.sequence([
      Animated.timing(tileOpacity, {
        toValue: 0.1,
        duration: state.animationPace / 2,
        useNativeDriver: true,
      }),
      Animated.timing(tileOpacity, {
        toValue: 1,
        duration: state.animationPace / 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const generateSequence: GenerateSequence = (length) => {
    return Array.from({ length }, (_, index) => {
      // If the index is greater or equal to the length of the sequence, generate a random number
      const sequenceItem =
        index >= state.sequence.length
          ? Math.floor(Math.random() * 4)
          : state.sequence[index];

      setTimeout(() => {
        animateTile(state.tiles[sequenceItem].opacity);
      }, state.animationPace * (index + 1));

      return sequenceItem;
    });
  };

  switch (action.type) {
    case "loadGameState":
      // If in storage is stored previous game state then load it if not return initial state
      if (action.payload === null) return { ...state };
      return { ...state, difficulties: action.payload };

    case "loadTiles":
      // Load tiles
      return { ...state, tiles: action.payload };

    case "difficulty":
      const difficulty = action.payload;

      // Set animation pace
      const pace =
        difficulty === "medium"
          ? ANIMATION_PACE_MEDIUM
          : difficulty === "hard"
          ? ANIMATION_PACE_HARD
          : ANIMATION_PACE_DEFAULT;

      return {
        ...state,
        difficulty: action.payload,
        animationPace: pace,
        isPlaying: false,
        gameOver: false,
        sequence: [],
      };

    case "startLevel":
      // Generate a new sequence
      const newSequence = generateSequence(action.payload);

      // Return state for start level
      return {
        ...state,
        sequence: newSequence,
        level: action.payload,
        toGo: action.payload,
        userGuess: 0,
        hints: 3,
        isPlaying: false,
        levelUp: false,
        gameOver: false,
      };

    case "startPlay":
      // Enabled user response
      return { ...state, isPlaying: true };

    case "showHint":
      // Animate current tile to click by user
      animateTile(state.tiles[state.sequence[state.userGuess]].opacity);
      return { ...state, hints: state.hints - 1 };

    case "verifyUserResponse":
      const userResponse = action.payload;
      const sequence = state.sequence;
      const correct = sequence[state.userGuess] === userResponse;

      // If user response is correct
      if (correct) {
        // If the user has guessed all the tiles
        if (state.userGuess === sequence.length - 1) {
          console.log(
            state.difficulties[state.difficulty].level,
            state.level + 1,
            state.difficulties[state.difficulty].level < state.level + 1
          );
          const storageLevel =
            state.level === LEVELS
              ? state.level
              : state.difficulties[state.difficulty].level > state.level + 1
              ? state.difficulties[state.difficulty].level
              : state.level + 1;

          const newLevel =
            state.level === LEVELS ? state.level : state.level + 1;

          // Save to storage
          saveToStorage({
            ...state.difficulties,
            [state.difficulty]: {
              ...state.difficulties[state.difficulty],
              level: storageLevel,
            },
          });

          return {
            ...state,
            toGo: newLevel,
            level: newLevel,
            userGuess: 0,
            hints: 3,
            isPlaying: false,
            levelUp: true,
            difficulties: {
              ...state.difficulties,
              [state.difficulty]: {
                ...state.difficulties[state.difficulty],
                level: storageLevel,
              },
            },
          };
        }

        // If user quessed the tile
        return {
          ...state,
          toGo: state.toGo - 1,
          userGuess: state.userGuess + 1,
        };
      }

      // If user response is incorrect
      return { ...state, gameOver: true, isPlaying: false };

    default:
      return state;
  }
};

function GameProvider({ children }: GameContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const tiles = [
    { color: "blue", opacity: useAnimatedValue(1) },
    {
      color: "yellow",
      opacity: useAnimatedValue(1),
    },
    { color: "red", opacity: useAnimatedValue(1) },
    { color: "white", opacity: useAnimatedValue(1) },
  ];

  useEffect(() => {
    dispatch({ type: "loadTiles", payload: tiles });
    const loadGameState = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("gameState");
        dispatch({
          type: "loadGameState",
          payload: jsonValue != null ? JSON.parse(jsonValue) : null,
        });
      } catch (e) {
        // Error handling if needed
        console.error("Failed to load game state", e);
      }
    };

    loadGameState();
  }, []);

  useStartLevel(state.level, state.levelUp, state.animationPace, dispatch);

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
