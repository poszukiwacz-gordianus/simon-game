import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import ManageSoundSettings from "./ManageSoundSettings";
import ResetAppSettings from "./ResetAppSettings";
import IconWithPopup from "@/components/UI/IconWithPopup";
import FontText from "@/components/UI/FontText";
import { Colors } from "@/constants/Colors";

export default function SettingsModal() {
  return (
    <IconWithPopup
      icon={<Ionicons name="settings" size={24} color={Colors.tint} />}
      position={{ top: 20, right: 20 }}
    >
      <>
        <FontText style={{ fontSize: 40, marginBottom: 20 }}>Settings</FontText>
        <View
          style={{
            gap: 10,
          }}
        >
          <ManageSoundSettings />
          <ResetAppSettings />
        </View>
      </>
    </IconWithPopup>
  );
}
