import { FontAwesome } from "@expo/vector-icons";
import { rulesContent } from "@/content/content";
import IconWithPopup from "@/components/UI/IconWithPopup";
import FontText from "@/components/UI/FontText";

export default function InfoModal() {
  return (
    <IconWithPopup
      icon={<FontAwesome name="info" size={24} color="#000" />}
      position={{ top: 80, right: 20 }}
    >
      <>
        <FontText style={{ fontSize: 24, marginBottom: 10 }}>
          Informations
        </FontText>
        {rulesContent.map((ruleText, index) => (
          <FontText key={index}>
            {index + 1}. {ruleText}
          </FontText>
        ))}
      </>
    </IconWithPopup>
  );
}