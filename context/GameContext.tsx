import {
  ANIMATION_PACE_DEFAULT,
  ANIMATION_PACE_HARD,
  ANIMATION_PACE_MEDIUM,
  DEFAULT_DIFFICULTY,
  HINTS,
} from "@/config";
import useSounds from "@/hooks/useSounds";
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
import { useAudioPlayer } from "expo-audio";

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
  gameInProgress: false,
  isPlaying: false,
  levelUp: false,
  gameOver: false,
  tiles: [],
  sequence: [],
  animationPace: ANIMATION_PACE_DEFAULT,
  playTileSound(index: number) {
    const tile = this.tiles[index];
    if (tile && this.sounds!.length) {
      // Ensure sounds are loaded
      requestAnimationFrame(() => {
        tile.sound();
      });
    }
  },
};

export const reducer: GameReducer = (state, action) => {
  const animateTile: AnimatedTile = (tileOpacity) => {
    Animated.sequence([
      Animated.timing(tileOpacity, {
        toValue: 0.5,
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

  const generateSequence: GenerateSequence = (previousSequence = []) => {
    const sequenceLength = state.level;
    const newSequence = previousSequence.length === 0;

    return Array.from({ length: sequenceLength }, (_, index) => {
      const sequenceItem = newSequence
        ? Math.floor(Math.random() * 4)
        : previousSequence[index];

      setTimeout(() => {
        requestAnimationFrame(() => {
          const tileIndex = sequenceItem;
          state.playTileSound(tileIndex);
          animateTile(state.tiles[tileIndex].opacity);
        });
      }, state.animationPace * (index + 1));

      return sequenceItem;
    });
  };

  switch (action.type) {
    case "loadTiles":
      return { ...state, tiles: action.payload };

    case "difficulty":
      const difficulty = action.payload;
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
        levelUp: false,
        gameInProgress: false,
        gameOver: false,
      };

    case "setLevel":
      return {
        ...state,
        level: action.payload,
        toGo: action.payload,
        userGuess: 0,
        hints: 3,
        isPlaying: false,
        levelUp: false,
        gameInProgress: false,
        gameOver: false,
        sequence: [],
      };

    case "startLevel":
      const sequence = generateSequence(state.sequence);
      return { ...state, sequence };

    case "startPlay":
      return { ...state, gameInProgress: true, isPlaying: true };

    case "nextLevel":
      return { ...state, levelUp: false };

    case "showHint":
      state.playTileSound(state.sequence[state.userGuess]);
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
      ) {
        state.playTileSound(state.sequence[state.userGuess]);
        return {
          ...state,
          toGo: state.toGo - 1,
          userGuess: state.userGuess + 1,
        };
      }

      if (
        state.userGuess === state.sequence.length - 1 &&
        action.payload === state.sequence.at(state.userGuess)
      ) {
        state.playTileSound(state.sequence[state.userGuess]);
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
      }
      return { ...state, gameOver: true };

    default:
      return state;
  }
};

function GameProvider({ children }: GameContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sounds, playSound } = useSounds();

  const player = useAudioPlayer("@/assets/sounds/wrong.mp3");
  player.play();

  const tiles = [
    { color: "blue", opacity: useAnimatedValue(1), sound: () => playSound(0) },
    {
      color: "yellow",
      opacity: useAnimatedValue(1),
      sound: () => playSound(1),
    },
    { color: "red", opacity: useAnimatedValue(1), sound: () => playSound(2) },
    { color: "white", opacity: useAnimatedValue(1), sound: () => playSound(3) },
  ];

  useEffect(() => {
    state.sounds = sounds;
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
