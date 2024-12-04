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
  STORAGE_GAME_STATE_KEY,
  WINNING_SOUND,
} from "@/config";
import {
  type GameContextType,
  type GameContextProviderProps,
  type GameState,
  type GameReducer,
} from "@/types/types";
import {
  animateTile,
  generateTileSequence,
  playSound,
  saveStateToStorage,
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
  isAppActive: false,
  isPlaying: false,
  isSoundOn: true,
  levelUp: false,
  gameOver: false,
  isInfiniteMode: false,
  isNewBestScore: false,
  tiles: [],
  sequence: [],
  tilesSounds: [],
  animationPace: DEFAULT_ANIMATION_PACE,
  timeoutRefs: { current: [] },
};

const gameReducer: GameReducer = (state, action) => {
  // console.log("gameReducer");
  switch (action.type) {
    case "GAME_LOAD_STATE":
      // console.log("LOAD_GAME_STATE");
      // Load saved game state
      return {
        ...state,
        ...action.payload,
      };

    case "GAME_LOAD_CONTENT": {
      // console.log("LOAD_DEFAULT_CONTENT");
      // Load tiles, tile sound, and game over sound
      const load = action.payload;
      return {
        ...state,
        tiles: load.tiles,
        tilesSounds: load.tilesSounds,
        timeoutRefs: load.timeoutRefs,
        isAppActive: true,
      };
    }

    case "GAME_SET_DIFFICULTY": {
      // console.log("SET_DIFFICULTY");
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
    }

    case "GAME_SET_SOUND_INDEX": {
      // console.log("SET_SOUND_INDEX");
      playSound(action.payload, state.tilesSounds);
      saveStateToStorage(STORAGE_GAME_STATE_KEY, {
        difficulties: state.difficulties,
        bestScore: state.bestScore,
        tileSoundIndex: action.payload,
      });
      return {
        ...state,
        tileSoundIndex: action.payload,
      };
    }

    case "GAME_SET_INFINITE_MODE":
      console.log("SET_INFINITE_MODE");
      return {
        ...state,
        isInfiniteMode: action.payload,
      };

    case "GAME_SET_TILES":
      // console.log("SET_TILES");
      return {
        ...state,
        tiles: action.payload,
      };

    case "GAME_TOGGLE_SOUND":
      // console.log("TOGGLE_SOUND");
      return {
        ...state,
        isSoundOn: !state.isSoundOn,
      };

    case "GAME_INITIALIZE_LEVEL":
      // console.log("INITIALIZE_LEVEL");
      // Initialize level
      const level = action.payload;
      return {
        ...state,
        level,
        tilesRemaining: level,
        isPlaying: false,
        gameOver: false,
        levelUp: false,
        isNewBestScore: level === 0 ? false : state.isNewBestScore,
        userGuess: 0,
        hints: DEFAULT_HINTS,
      };

    case "GAME_SHOW_SEQUENCE": {
      // console.log("SHOW_SEQUENCE");
      // Generate a new sequence
      const newSequence = generateTileSequence(state);
      return {
        ...state,
        sequence: newSequence,
      };
    }

    case "GAME_ENABLE_USER_RESPONSE":
      // console.log("ENABLE_USER_RESPONSE");
      return { ...state, isPlaying: true };

    case "GAME_SHOW_HINT": {
      // console.log("SHOW_HINT");
      // Animate and play sound for current tile
      if (state.isSoundOn) playSound(state.tileSoundIndex, state.tilesSounds);
      animateTile(
        state.tiles[state.sequence[state.userGuess]].opacity,
        state.animationPace
      );
      return { ...state, hints: state.hints - 1 };
    }

    case "GAME_VERIFY_USER_RESPONSE": {
      console.log("VERIFY_USER_RESPONSE");
      const userResponse = action.payload;
      const isCorrect = state.sequence[state.userGuess] === userResponse;

      // If user response is isCorrect
      if (isCorrect) {
        // Play tile sound
        if (state.isSoundOn) playSound(state.tileSoundIndex, state.tilesSounds);
        const isLevelCompleted = state.userGuess === state.sequence.length - 1;

        // Handle level completion logic
        if (isLevelCompleted) {
          // Check if the new level is greater than current max difficulty level
          const isMaxLevelExceeded =
            state.difficulties[state.difficulty].level < state.level + 1 &&
            state.level < DEFAULT_MAX_LEVELS;

          // Set new level if it's not greater than current max difficulty level and game is not in infinite mode
          const newLevel =
            isMaxLevelExceeded && state.isInfiniteMode
              ? state.difficulties[state.difficulty].level
              : state.level + 1;

          // If its infinite mode level starts at 0 so we need to add 1
          const infinitiLevel = state.level + 1;
          // Check if user has new best score
          const isNewBestScore =
            state.isInfiniteMode && infinitiLevel > state.bestScore;

          // If it's new best score than update best score otherwise not
          const bestScore = isNewBestScore ? infinitiLevel : state.bestScore;

          // Update difficulties state if newLevel is higher than current max difficulty level else return current state difficulties
          const difficulties = isMaxLevelExceeded
            ? {
                ...state.difficulties,
                [state.difficulty]: {
                  ...state.difficulties[state.difficulty],
                  level: newLevel,
                },
              }
            : state.difficulties;

          // Save to storage if new level is greater than current max difficulty level
          if (isMaxLevelExceeded || (state.isInfiniteMode && isNewBestScore)) {
            saveStateToStorage(STORAGE_GAME_STATE_KEY, {
              difficulties,
              bestScore,
              tileSoundIndex: state.tileSoundIndex,
            });
          }

          return {
            ...state,
            levelUp: true,
            difficulties,
            bestScore,
            isNewBestScore,
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
      if (state.isSoundOn) {
        if (state.isNewBestScore) playSound(WINNING_SOUND, state.tilesSounds);
        else playSound(GAME_OVER_SOUND, state.tilesSounds);
      }

      return {
        ...state,
        gameOver: true,
      };
    }

    case "GAME_RESET_STATE": {
      // console.log("RESET_APP_STATE");
      saveStateToStorage(STORAGE_GAME_STATE_KEY, {
        difficulties: DEFAULT_DIFFICULTIES,
        bestScore: DEFAULT_BEST_SCORE,
        tileSoundIndex: DEFAULT_TILE_SOUND_INDEX,
      });

      return {
        ...state,
        difficulties: DEFAULT_DIFFICULTIES,
        bestScore: DEFAULT_BEST_SCORE,
        tileSoundIndex: DEFAULT_TILE_SOUND_INDEX,
        isSoundOn: true,
      };
    }

    default:
      return state;
  }
};

function GameProvider({ children }: GameContextProviderProps) {
  // console.log("gameProvider");
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGameContext(): GameContextType {
  // console.log("useGameContext");
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}

export { GameProvider, useGameContext };
