import { Button } from "react-native";
import { useStoreContext } from "@/context/StoreContext";
import { Colors } from "@/constants/Colors";

export default function StoreUnlockButton({
  id,
  setName,
}: {
  id: number;
  setName: string;
}) {
  const { dispatch } = useStoreContext();
  return (
    <Button
      title="Unlock Now"
      color={Colors.buttonPrimary}
      onPress={() => {
        dispatch({ type: "STORE_SET_PURCHASE", payload: { id, setName } });
      }}
    />
  );
}
