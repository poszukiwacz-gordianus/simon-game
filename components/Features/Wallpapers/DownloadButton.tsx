import { downloadWallpaper } from "@/utils/helpers";
import { Button } from "react-native";

export default function DownloadButton({
  setName,
  id,
}: {
  setName: string;
  id: number;
}) {
  return (
    <Button title="Download" onPress={() => downloadWallpaper(setName, id)} />
  );
}
