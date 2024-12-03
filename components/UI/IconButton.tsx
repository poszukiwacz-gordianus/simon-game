import {
  Pressable,
  type PressableProps,
  StyleSheet,
  TextProps,
} from "react-native";
import FontText from "./FontText";

type IconName = "Go Back" | "Try Again" | "Hint" | "Home" | "Exit App";

type IconButtonProps = PressableProps & {
  iconName: IconName;
  style?: TextProps["style"];
};

/**
 * Button component with a pressable container.
 *
 * @param {React.PropsWithChildren<PressableProps>} props The props to pass to the Pressable component.
 * @returns {React.ReactElement} The renderable button component.
 */
export default function IconButton({
  children,
  iconName,
  style,
  ...props
}: React.PropsWithChildren<IconButtonProps>): React.ReactElement {
  return (
    <Pressable {...props} style={styles.container}>
      {children}
      <FontText style={[style, { fontSize: 16 }]}>{iconName}</FontText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
