import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
  Alert,
  BackHandler,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import IconButton from "../UI/IconButton";
import { Colors } from "@/constants/Colors";

export default function BackButton({
  isFirstScreen = false,
  callback = () => {},
  style,
  iconName = "Go Back",
  ...props
}: {
  isFirstScreen?: boolean;
  callback?: () => void;
  style?: StyleProp<ViewStyle>;
  iconName?: "Go Back" | "Exit App";
  props?: React.PropsWithChildren<PressableProps>;
}) {
  const handleBackPress = () => {
    if (isFirstScreen) {
      // Exit application logic
      Alert.alert("Exit App", "Are you sure you want to exit?", [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ]);
    } else {
      callback();
      router.back();
    }
  };
  return (
    <Pressable style={style} {...props}>
      <IconButton iconName={iconName} onPress={handleBackPress}>
        <AntDesign name="back" size={48} color={Colors.iconTint} />
      </IconButton>
    </Pressable>
  );
}
