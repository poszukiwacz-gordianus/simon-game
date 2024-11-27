import { StyleSheet, Pressable } from "react-native";
import { rulesContent } from "@/content/content";
import FontText from "./FontText";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "./Modal";

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
          color="#000"
          style={{ textAlign: "center" }}
        />
      </Pressable>

      {isRulesVisible && (
        <Modal onClose={() => setIsRulesVisible(false)}>
          <FontText style={styles.header}>Rules</FontText>
          {rulesContent.map((ruleText, index) => (
            <FontText key={index} style={styles.rule}>
              {index + 1}. {ruleText}
            </FontText>
          ))}
        </Modal>
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
