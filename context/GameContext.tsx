import { createContext, useContext, useReducer, useRef } from "react";
import {
  DEFAULT_ANIMATION_PACE,
  DEFAULT_ANIMATION_PACE_HARD,
  DEFAULT_ANIMATION_PACE_MEDIUM,
  DEFAULT_BEST_SCORE,
  DEFAULT_DIFFICULTIES,
  DEFAULT_DIFFICULTY,
  DEFAULT_HINTS,
  DEFAULT_MAX_LEVELS,
  DEFAULT_TILE_SOUND_INDEX,
  GAME_OVER_SOUND,
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
  tileSoundIndex: DEFAULT_TILE_SOUND_INDEX,
  bestScore: DEFAULT_BEST_SCORE,
  isPlaying: false,
  isSoundOn: true,
  levelUp: false,
  gameOver: false,
  isInfiniteMode: false,
  tiles: [],
  sequence: [],
  animationPace: DEFAULT_ANIMATION_PACE,
  tileSound: () => {},
  gameOverSound: () => {},
};

const gameReducer: GameReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_GAME_STATE":
      // Load saved game state
      return {
        ...state,
        difficulties: action.payload.difficulties,
        bestScore: action.payload.bestScore,
      };

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

    case "SET_SOUND_INDEX":
      return {
        ...state,
        tileSoundIndex: action.payload,
      };

    case "SET_INFINITE_MODE":
      return {
        ...state,
        isInfiniteMode: action.payload,
      };

    case "TOGGLE_SOUND":
      return {
        ...state,
        isSoundOn: !state.isSoundOn,
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
      const newSequence = action.payload(state.level);

      // Return state with new sequence
      return {
        ...state,
        sequence: newSequence,
      };

    case "ENABLE_USER_RESPONSE":
      return { ...state, isPlaying: true };

    case "SHOW_HINT":
      // Animate and play sound for current tile
      if (state.isSoundOn) state.tileSound(state.tileSoundIndex);
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
        // Play tile sound
        if (state.isSoundOn) state.tileSound(state.tileSoundIndex);
        const isLevelCompleted = state.userGuess === state.sequence.length - 1;

        // Handle level completion logic
        if (isLevelCompleted) {
          // Check if the new level is greater than current max difficulty level
          const isMaxLevelExceeded =
            state.difficulties[state.difficulty].level < state.level + 1 &&
            state.level < DEFAULT_MAX_LEVELS;
          const newLevel =
            isMaxLevelExceeded && state.isInfiniteMode
              ? state.difficulties[state.difficulty].level
              : state.level + 1;

          // Save to storage if new level is greater than current max difficulty level
          if (isMaxLevelExceeded) {
            saveGameStateToStorage("gameState", {
              difficulties: {
                ...state.difficulties,
                [state.difficulty]: {
                  ...state.difficulties[state.difficulty],
                  level: newLevel,
                },
              },
              bestScore:
                state.isInfiniteMode && state.level > state.bestScore
                  ? state.level
                  : state.bestScore,
            });
          }

          return {
            ...state,
            levelUp: true,
            difficulties: {
              ...state.difficulties,
              [state.difficulty]: {
                ...state.difficulties[state.difficulty],
                level: newLevel,
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
      // Play game over sound
      if (state.isSoundOn) state.gameOverSound(GAME_OVER_SOUND);
      return {
        ...state,
        gameOver: true,
        bestScore:
          state.isInfiniteMode && state.level > state.bestScore
            ? state.level - 1
            : state.bestScore,
      };

    case "RESET_APP_STATE":
      saveGameStateToStorage("gameState", {
        difficulties: DEFAULT_DIFFICULTIES,
        bestScore: DEFAULT_BEST_SCORE,
      });

      return {
        ...state,
        difficulties: DEFAULT_DIFFICULTIES,
        bestScore: DEFAULT_BEST_SCORE,
        tileSoundIndex: DEFAULT_TILE_SOUND_INDEX,
        isSoundOn: true,
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
