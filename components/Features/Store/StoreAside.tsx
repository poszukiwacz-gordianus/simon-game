import FontText from "@/components/UI/FontText";
import { Button, StyleSheet, useAnimatedValue, View } from "react-native";
import StoreUnlockButton from "./StoreUnlockButton";
import { TileSet } from "@/types/types";
import { useStoreContext } from "@/context/StoreContext";
import { useGameContext } from "@/context/GameContext";
import { Colors } from "@/constants/Colors";

export default function StoreAside({ tileSet }: { tileSet: TileSet }) {
  const { dispatch: storeDispatch } = useStoreContext();
  const { dispatch: gameDispatch } = useGameContext();

  const { setName, isUnlocked, isCurrentlyUsed, unlockedAt, id, tiles } =
    tileSet;

  const newTiles = tiles.map((source) => ({
    source,
    opacity: useAnimatedValue(1),
  }));

  const handleButtonPress = () => {
    storeDispatch({ type: "STORE_SET_CURRENT_TILESET", payload: id });
    gameDispatch({ type: "GAME_SET_TILES", payload: newTiles });
  };

  return (
    <View style={[styles.aside]}>
      <FontText style={styles.cardHeader}>{setName}</FontText>
      {!isUnlocked && (
        <FontText style={styles.cardAside}>
          Set is unlocked at level {unlockedAt.level} difficulty{" "}
          {unlockedAt.difficulty}
        </FontText>
      )}

      {isUnlocked && (
        <Button
          title={isCurrentlyUsed ? "In Use" : "Use Now"}
          color={Colors.buttonSecondary}
          disabled={isCurrentlyUsed}
          onPress={handleButtonPress}
        />
      )}
      {!isUnlocked && <StoreUnlockButton id={id} setName={setName} />}
    </View>
  );
}

const styles = StyleSheet.create({
  aside: {
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontSize: 24,
    padding: 10,
    color: Colors.textPrimary,
    backgroundColor: Colors.backgroundAccent,
    borderRadius: 10,
  },
  cardAside: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    color: Colors.textPrimary,
  },
});
