import FontText from "@/components/UI/FontText";
import Modal from "@/components/UI/Modal";
import { useStoreContext } from "@/context/StoreContext";
import { Button, View } from "react-native";

export default function StoreBuyModal() {
  const {
    state: {
      purchase: { isModalOpen, id, setName, setPrice, allSetsPrice },
    },
    dispatch,
  } = useStoreContext();
  return (
    isModalOpen && (
      <Modal onClose={() => dispatch({ type: "TOGGLE_MODAL" })}>
        <View style={{ gap: 20 }}>
          <View style={{ gap: 10 }}>
            <FontText
              style={{ fontSize: 24, marginBottom: 10, textAlign: "center" }}
            >
              Unlock {setName} tiles
            </FontText>
            <Button title={`for $${setPrice}`} />
          </View>
          <View>
            <FontText
              style={{ fontSize: 30, marginBottom: 10, textAlign: "center" }}
            >
              Or unlock all Tiles
            </FontText>
            <Button title={`just for $${allSetsPrice}`} />
          </View>
        </View>
      </Modal>
    )
  );
}
