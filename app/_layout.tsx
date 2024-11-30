import { GameProvider } from "@/context/GameContext";
import useLoadOnAppStart from "@/hooks/useLoadOnAppStart";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <StatusBar hidden />
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, animation: "slide_from_left" }}
          />
          <Stack.Screen
            name="game"
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="levels"
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
        </Stack>
      </GameProvider>
    </SafeAreaProvider>
  );
}
