import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import IconButton from "./IconButton";
import {
  Alert,
  BackHandler,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

export default function BackButton({
  isFirstScreen = false,
  callback = () => {},
  style,
  ...props
}: {
  isFirstScreen?: boolean;
  callback?: () => void;
  style?: StyleProp<ViewStyle>;
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
      <IconButton onPress={handleBackPress}>
        <AntDesign name="back" size={48} color="#FCFCF7" />
      </IconButton>
    </Pressable>
  );
}
