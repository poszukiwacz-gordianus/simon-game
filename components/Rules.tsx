import { StyleSheet, Text, View, Pressable } from "react-native";
import { rulesContent } from "@/content/content";
import FontText from "./FontText";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function Rules() {
  const [isRulesVisible, setIsRulesVisible] = useState(false);

  return (
    <>
      <Pressable
        style={styles.info}
        onPress={() => setIsRulesVisible(!isRulesVisible)}
      >
        <FontAwesome
          name="info"
          size={30}
          color="#000000"
          style={{ textAlign: "center" }}
        />
      </Pressable>

      {isRulesVisible && (
        <Pressable
          style={styles.centeredView}
          onPress={() => setIsRulesVisible(false)}
        >
          <Animated.View
            entering={BounceIn}
            exiting={BounceOut}
            style={styles.centeredView}
          >
            <View style={styles.modalView}>
              <FontText style={styles.header}>Rules</FontText>
              {rulesContent.map((ruleText, index) => (
                <FontText key={index} style={styles.rule}>
                  {index + 1}. {ruleText}
                </FontText>
              ))}
            </View>
          </Animated.View>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  info: {
    position: "absolute", // Position the info button
    top: 20,
    right: 20,
    backgroundColor: "#FEF2BF",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalView: {
    width: "80%",
    backgroundColor: "#FEF2BF",
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
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  rule: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "left",
  },
});
