import { WALLPAPER_COST } from "@/config";
import { Colors } from "@/constants/Colors";
import { useGameContext } from "@/context/GameContext";
import { useStoreContext } from "@/context/StoreContext";
import { Button } from "react-native";

export default function ButtonBuyWallpaper({
  setId,
  wallpaperId,
}: {
  setId: number;
  wallpaperId: number;
}) {
  const {
    state: { coins },
    dispatch: dispatchGame,
  } = useGameContext();
  const { dispatch: dispatchStore } = useStoreContext();

  const isEnoughCoins = coins >= WALLPAPER_COST;

  const handleBuy = () => {
    console.log("Buying wallpaper");
    if (isEnoughCoins) {
      dispatchStore({
        type: "STORE_BUY_WALLPAPER",
        payload: { setId, wallpaperId },
      });
      dispatchGame({ type: "GAME_USE_COINS", payload: WALLPAPER_COST });
    } else dispatchStore({ type: "STORE_SET_WALLPAPER_MODAL" });
  };
  return (
    <Button
      title={`Buy now for ${WALLPAPER_COST} coins`}
      color={Colors.buttonPrimary}
      onPress={handleBuy}
    />
  );
}
