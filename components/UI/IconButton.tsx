import { Pressable, type PressableProps, StyleSheet } from "react-native";

/**
 * Button component with a pressable container.
 *
 * @param {React.PropsWithChildren<PressableProps>} props The props to pass to the Pressable component.
 * @returns {React.ReactElement} The renderable button component.
 */
export default function IconButton({
  children,
  ...props
}: React.PropsWithChildren<PressableProps>): React.ReactElement {
  return (
    <Pressable {...props} style={styles.container}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
  },
});
