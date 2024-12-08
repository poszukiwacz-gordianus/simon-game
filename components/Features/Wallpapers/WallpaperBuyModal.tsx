import FontText from "@/components/UI/FontText";
import Modal from "@/components/UI/Modal";
import { useStoreContext } from "@/context/StoreContext";
import { Button, View } from "react-native";
import ButtonBuyWallpaper from "./ButtonBuyWallpaper";
import { Colors } from "@/constants/Colors";
import { WALLPAPER_COST } from "@/config";
import { useGameContext } from "@/context/GameContext";

export default function WallpaperBuyModal() {
  const {
    state: { wallpaperModal },
    dispatch: storeDispatch,
  } = useStoreContext();

  const {
    state: { coins },
  } = useGameContext();

  const isEnoughCoins = coins < WALLPAPER_COST;

  return (
    wallpaperModal && (
      <Modal onClose={() => storeDispatch({ type: "STORE_TOGGLE_MODAL" })}>
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
