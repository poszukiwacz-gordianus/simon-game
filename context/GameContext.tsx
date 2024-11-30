import { createContext, useContext, useReducer } from "react";
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
import { animateTile, saveGameStateToStorage } from "@/utils/helpers";
import useTriggerLevelStart from "@/hooks/useTriggerLevelStart";
import useInitializeLevelSequence from "@/hooks/useInitializeLevelSequence";

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
  isAppActive: false,
  isPlaying: false,
  isSoundOn: true,
  levelUp: false,
  gameOver: false,
  isInfiniteMode: false,
  isNewBestScore: false,
  tiles: [],
  sequence: [],
  animationPace: DEFAULT_ANIMATION_PACE,
  timeoutRefs: { current: [] },
  tileSound: () => {},
  gameOverSound: () => {},
  tileSequence: () => [],
  stopAnimation: () => {},
};

const gameReducer: GameReducer = (state, action) => {
  console.log("gameReducer");
  switch (action.type) {
    case "LOAD_GAME_STATE":
      console.log("LOAD_GAME_STATE");
      // Load saved game state
      return {
        ...state,
        difficulties: action.payload.difficulties || DEFAULT_DIFFICULTIES,
        bestScore: action.payload.bestScore || DEFAULT_BEST_SCORE,
      };

    case "LOAD_DEFAULT_CONTENT":
      console.log("LOAD_DEFAULT_CONTENT");
      // Load tiles, tile sound, and game over sound
      const load = action.payload;
      return {
        ...state,
        tiles: load.tiles,
        tileSound: load.tileSound,
        gameOverSound: load.gameOverSound,
        tileSequence: load.tileSequence,
        stopAnimation: load.stopAnimation,
        timeoutRefs: load.timeoutRefs,
        isAppActive: true,
      };

    case "SET_DIFFICULTY":
      console.log("SET_DIFFICULTY");
      // Set difficulty choosen by user
      const difficulty = action.payload;

      // Set animation pace based on difficulty
      const animationPace =
        difficulty === "medium"
          ? DEFAULT_ANIMATION_PACE_MEDIUM
          : difficulty === "hard"
          ? DEFAULT_ANIMATION_PACE_HARD
          : DEFAULT_ANIMATION_PACE;

      return {
        ...state,
        difficulty: action.payload,
        animationPace,
        sequence: [],
      };

    case "SET_SOUND_INDEX":
      console.log("SET_SOUND_INDEX");
      state.tileSound(action.payload);
      return {
        ...state,
        tileSoundIndex: action.payload,
      };

    case "SET_INFINITE_MODE":
      console.log("SET_INFINITE_MODE");
      return {
        ...state,
        isInfiniteMode: action.payload,
      };

    case "TOGGLE_SOUND":
      console.log("TOGGLE_SOUND");
      return {
        ...state,
        isSoundOn: !state.isSoundOn,
      };

    case "INITIALIZE_LEVEL":
      console.log("INITIALIZE_LEVEL");
      // Initialize level
      return {
        ...state,
        level: action.payload,
        tilesRemaining: action.payload,
        isPlaying: false,
        gameOver: false,
        levelUp: false,
        isNewBestScore: false,
        userGuess: 0,
        hints: DEFAULT_HINTS,
      };

    case "SHOW_SEQUENCE":
      console.log("SHOW_SEQUENCE");
      // Generate a new sequence
      // Ensure `tileSequence` is a function before calling it
      if (typeof state.tileSequence === "function") {
        console.log("tileSequence is a function");
        const newSequence = state.tileSequence(state); // Pass the state here
        return {
          ...state,
          sequence: newSequence,
        };
      } else {
        console.error("tileSequence is not a function!");
        return state; // Return unchanged state as a fallback
      }

    case "ENABLE_USER_RESPONSE":
      console.log("ENABLE_USER_RESPONSE");
      return { ...state, isPlaying: true };

    case "SHOW_HINT":
      console.log("SHOW_HINT");
      // Animate and play sound for current tile
      if (state.isSoundOn) state.tileSound(state.tileSoundIndex);
      animateTile(
        state.tiles[state.sequence[state.userGuess]].opacity,
        state.animationPace
      );
      return { ...state, hints: state.hints - 1 };

    case "VERIFY_USER_RESPONSE":
      console.log("VERIFY_USER_RESPONSE");
      const userResponse = action.payload;
      const isCorrect = state.sequence[state.userGuess] === userResponse;
      const isNewBestScore =
        state.isInfiniteMode && state.level > state.bestScore;

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
          const bestScore = isNewBestScore ? state.level : state.bestScore;

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
              bestScore,
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
            bestScore,
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
        isNewBestScore,
      };

    case "RESET_APP_STATE":
      console.log("RESET_APP_STATE");
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
  console.log("gameProvider");
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { initializeLevelSequence } = useInitializeLevelSequence(
    state,
    dispatch
  );

  // Trigger automatic level start after level up
  useTriggerLevelStart(state.level + 1, state.levelUp, initializeLevelSequence);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        initializeLevelSequence,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGameContext(): GameContextType {
  console.log("useGameContext");
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}

export { GameProvider, useGameContext };
