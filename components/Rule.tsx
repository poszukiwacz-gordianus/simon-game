import { type RuleProps } from "@/types/types";
import { Text } from "react-native";

export default function Rule({ rule, index }: RuleProps) {
  return (
    <Text style={{ color: "#FEF2BF", fontSize: 20, marginTop: 10 }}>
      {index + 1}. {rule}
    </Text>
  );
}
