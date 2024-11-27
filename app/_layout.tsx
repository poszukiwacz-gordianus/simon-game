import { GameProvider } from "@/context/GameContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
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
              options={{
                title: "Back",
                headerStyle: { backgroundColor: "#c2a664" },
                headerTintColor: "#000",
                animation: "slide_from_right",
              }}
            />
          </Stack>
        </GameProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
