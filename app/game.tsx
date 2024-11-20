import { useSearchParams } from "expo-router/build/hooks";
import { Text } from "react-native";

export default function Game() {
  const params = useSearchParams();
  const level = Number(params.get("level"));
  return <Text>Game level: {level}</Text>;
}
