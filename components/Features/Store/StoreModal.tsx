import { Ionicons } from "@expo/vector-icons";
import FontText from "@/components/UI/FontText";
import IconWithPopup from "@/components/UI/IconWithPopup";

export default function StoreModal() {
  return (
    <IconWithPopup
      icon={<Ionicons name="storefront" size={24} color="#000" />}
      position={{ top: 200, right: 20 }}
    >
      <FontText>Store</FontText>
    </IconWithPopup>
  );
}
