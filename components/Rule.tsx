import { type RuleProps } from "@/types/types";
import FontText from "./FontText";

export default function Rule({ rule, index }: RuleProps) {
  return (
    <FontText style={{ color: "#FEF2BF", fontSize: 20, marginTop: 10 }}>
      {index + 1}. {rule}
    </FontText>
  );
}
