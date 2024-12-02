import { Button } from "react-native";
import { useStoreContext } from "@/context/StoreContext";

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
      color="#c2a664"
      onPress={() => {
        dispatch({ type: "SET_PURCHASE", payload: { id, setName } });
      }}
    />
  );
}
