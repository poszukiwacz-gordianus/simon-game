import { createContext, useContext, useReducer, useRef } from "react";
import {
  DEFAULT_ANIMATION_PACE,
  DEFAULT_ANIMATION_PACE_HARD,
  DEFAULT_ANIMATION_PACE_MEDIUM,
  DEFAULT_DIFFICULTIES,
  DEFAULT_DIFFICULTY,
  DEFAULT_HINTS,
  DEFAULT_MAX_LEVELS,
} from "@/config";
import {
  type GameContextType,
  type GameContextProviderProps,
  type GameState,
  type GameReducer,
} from "@/types/types";
import {
  animateTile,
  saveGameStateToStorage,
  stopTilesAnimation,
} from "@/utils/helpers";

const GameContext = createContext<GameContextType | null>(null);

// Initial game state
const initialState: GameState = {
  difficulty: DEFAULT_DIFFICULTY,
  difficulties: DEFAULT_DIFFICULTIES,
  level: 1,
  tilesRemaining: 1,
  userGuess: 0,
  hints: DEFAULT_HINTS,
  isPlaying: false,
  levelUp: false,
  gameOver: false,
  tiles: [],
  sequence: [],
  animationPace: DEFAULT_ANIMATION_PACE,
  tileSound: () => {},
  gameOverSound: () => {},
};

const gameReducer: GameReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_GAME_STATE":
      // Load game state difficulties
      return { ...state, difficulties: action.payload };

    case "LOAD_DEFAULT_CONTENT":
      // Load tiles, tile sound, and game over sound
      const load = action.payload;
      return {
        ...state,
        tiles: load.tiles,
        tileSound: load.tileSound,
        gameOverSound: load.gameOverSound,
      };

    case "SET_DIFFICULTY":
      // Set difficulty choosen by user
      const difficulty = action.payload;

      // Set animation pace based on difficulty
      const pace =
        difficulty === "medium"
          ? DEFAULT_ANIMATION_PACE_MEDIUM
          : difficulty === "hard"
          ? DEFAULT_ANIMATION_PACE_HARD
          : DEFAULT_ANIMATION_PACE;

      return {
        ...state,
        difficulty: action.payload,
        animationPace: pace,
        sequence: [],
      };

    case "INITIALIZE_LEVEL":
      // Initialize level
      return {
        ...state,
        level: action.payload,
        tilesRemaining: action.payload,
        isPlaying: false,
        gameOver: false,
        levelUp: false,
        userGuess: 0,
        hints: DEFAULT_HINTS,
      };

    case "SHOW_SEQUENCE":
      // Generate a new sequence
      const newSequence = action.payload(
        state.level,
        state.sequence,
        state.tiles,
        state.animationPace,
        state.tileSound
      );

      // Return state with new sequence
      return {
        ...state,
        sequence: newSequence,
      };

    case "ENABLE_USER_RESPONSE":
      return { ...state, isPlaying: true };

    case "SHOW_HINT":
      // Animate current tile to click by user
      state.tileSound();
      animateTile(
        state.tiles[state.sequence[state.userGuess]].opacity,
        state.animationPace
      );
      return { ...state, hints: state.hints - 1 };

    case "VERIFY_USER_RESPONSE":
      const userResponse = action.payload;
      const isCorrect = state.sequence[state.userGuess] === userResponse;

      // If user response is isCorrect
      if (isCorrect) {
        state.tileSound();
        const isLevelCompleted = state.userGuess === state.sequence.length - 1;

        // Handle level completion logic
        if (isLevelCompleted) {
          const newLevel = state.level + 1;
          // Check if the new level is greater than current max difficulty level
          const isMaxLevelExceeded =
            state.difficulties[state.difficulty].level < newLevel &&
            state.level < DEFAULT_MAX_LEVELS;

          // Save to storage if new level is greater than current max difficulty level
          if (isMaxLevelExceeded) {
            saveGameStateToStorage("gameState", {
              ...state.difficulties,
              [state.difficulty]: {
                ...state.difficulties[state.difficulty],
                level: newLevel,
              },
            });
          }

          return {
            ...state,
            levelUp: true,
            difficulties: {
              ...state.difficulties,
              [state.difficulty]: {
                ...state.difficulties[state.difficulty],
                level: isMaxLevelExceeded
                  ? newLevel
                  : state.difficulties[state.difficulty].level,
              },
            },
          };
        }

        // Handle correct tile guess
        return {
          ...state,
          tilesRemaining: state.tilesRemaining - 1,
          userGuess: state.userGuess + 1,
        };
      }

      // Handle incorrect guess
      state.gameOverSound();
      return {
        ...state,
        gameOver: true,
      };

    default:
      return state;
  }
};

function GameProvider({ children }: GameContextProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const timeoutRefs = useRef<number[]>([]); // Shared timeout refs for all tiles

  const stopAnimation = () => stopTilesAnimation(timeoutRefs, state.tiles);

  return (
    <GameContext.Provider
      value={{ state, dispatch, timeoutRefs, stopAnimation }}
    >
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
