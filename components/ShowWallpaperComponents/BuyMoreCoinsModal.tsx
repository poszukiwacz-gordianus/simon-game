import { Button, View } from "react-native";
import { useStoreContext } from "@/context/StoreContext";
import { Colors } from "@/constants/Colors";
import FontText from "@/components/UI/FontText";
import Modal from "@/components/UI/Modal";

export default function BuyMoreCoinsModal() {
  const {
    state: { wallpaperModal },
    dispatch,
  } = useStoreContext();

  return (
    wallpaperModal && (
      <Modal onClose={() => dispatch({ type: "STORE_TOGGLE_MODAL" })}>
        <View>
          <FontText
            style={{ fontSize: 30, marginBottom: 15, textAlign: "center" }}
          >
            Not enough coins?
          </FontText>
          <Button title="Buy more coins" color={Colors.buttonPrimary} />
        </View>
      </Modal>
    )
  );
}
