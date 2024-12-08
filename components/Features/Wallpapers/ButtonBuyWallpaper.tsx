import FontText from "@/components/UI/FontText";
import Modal from "@/components/UI/Modal";
import { WALLPAPER_COST } from "@/config";
import { Colors } from "@/constants/Colors";
import { useGameContext } from "@/context/GameContext";
import { useStoreContext } from "@/context/StoreContext";
import { useState } from "react";
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

  const isEnoughCoins = coins < WALLPAPER_COST;

  const handleBuy = () => {
    console.log("Buying wallpaper");
    dispatchStore({
      type: "STORE_BUY_WALLPAPER",
      payload: { setId, wallpaperId },
    });
    dispatchGame({ type: "GAME_USE_COINS", payload: WALLPAPER_COST });
  };
  return (
    <Button
      title={`for ${WALLPAPER_COST} coins`}
      color={Colors.buttonSecondary}
      onPress={handleBuy}
      disabled={isEnoughCoins}
    />
  );
}
