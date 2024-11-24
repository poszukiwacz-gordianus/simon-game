import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { useGameContext } from "@/context/GameContext";
import FontText from "./FontText";
import IconButton from "./IconButton";
import { startLevel } from "@/utils/helpers";

export default function GameOver() {
  const {
    state: { level, animationPace },
    dispatch,
  } = useGameContext();

  return (
    <Animated.View
      entering={BounceIn}
      exiting={BounceOut}
      style={styles.centeredView}
    >
      <View style={styles.modalView}>
        <FontText style={styles.text}>Game over</FontText>
        <View style={{ flexDirection: "row" }}>
          <IconButton
            onPress={() => startLevel(level, animationPace, dispatch)}
          >
            <AntDesign name="reload1" size={48} color="#FCFCF7" />
          </IconButton>
          <IconButton onPress={() => router.navigate("/")}>
            <AntDesign name="home" size={48} color="#FCFCF7" />
          </IconButton>
        </View>
      </View>
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    zIndex: 10, // Ensure it overlays other elements
  },
  modalView: {
    backgroundColor: "#c2a664",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 40,
    marginBottom: 20,
  },
});
