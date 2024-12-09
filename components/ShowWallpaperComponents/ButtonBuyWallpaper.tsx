import { useGameContext } from "@/context/GameContext";
import { useStoreContext } from "@/context/StoreContext";
import { WALLPAPER_COST } from "@/config";
import { Colors } from "@/constants/Colors";
import Button from "../UI/Button";

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

  const hasSufficientCoins = coins >= WALLPAPER_COST;

  const handlePurchase = () => {
    if (hasSufficientCoins) {
      dispatchStore({
        type: "STORE_BUY_WALLPAPER",
        payload: { setId, wallpaperId },
      });
      dispatchGame({ type: "GAME_USE_COINS", payload: WALLPAPER_COST });
    } else {
      dispatchStore({ type: "STORE_SET_WALLPAPER_MODAL" });
    }
  };

  return (
    <Button
      title={`${WALLPAPER_COST} coins`}
      style={{ backgroundColor: Colors.buttonPrimary }}
      onPress={handlePurchase}
    />
  );
}
