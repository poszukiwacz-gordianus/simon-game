import FontText from "@/components/UI/FontText";
import Modal from "@/components/UI/Modal";
import { useStoreContext } from "@/context/StoreContext";
import { Button, View } from "react-native";
import ButtonBuyWallpaper from "./ButtonBuyWallpaper";
import { Colors } from "@/constants/Colors";

export default function WallpaperBuyModal() {
  const {
    state: {
      wallpaperPurchase: { isModalOpen, setId, wallpaperId },
    },
    dispatch: storeDispatch,
  } = useStoreContext();

  return (
    isModalOpen && (
      <Modal onClose={() => storeDispatch({ type: "STORE_TOGGLE_MODAL" })}>
        <View style={{ gap: 20 }}>
          <View style={{ gap: 10 }}>
            <FontText
              style={{ fontSize: 24, marginBottom: 10, textAlign: "center" }}
            >
              Buy this wallpaper
            </FontText>
            <ButtonBuyWallpaper setId={setId} wallpaperId={wallpaperId} />
          </View>
          <View>
            <FontText
              style={{ fontSize: 30, marginBottom: 15, textAlign: "center" }}
            >
              Not enough coins?
            </FontText>
            <Button title="Buy more coins" color={Colors.buttonPrimary} />
          </View>
        </View>
      </Modal>
    )
  );
}
