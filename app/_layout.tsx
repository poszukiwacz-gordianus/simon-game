import { GameProvider } from "@/context/GameContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <GameProvider>
      <StatusBar hidden />
      <Stack screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ headerShown: false }} />
        <Stack.Screen
          name="levels"
          options={{
            title: "Home",
            headerStyle: { backgroundColor: "#2f4913" },
            headerTintColor: "#FEF2BF",
          }}
        />
      </Stack>
    </GameProvider>
  );
}
