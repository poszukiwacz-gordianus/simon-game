import { useLoadOnAppStart } from "@/hooks/useHooks";
import FontText from "../UI/FontText";

export default function LoadingAppScreen() {
  useLoadOnAppStart();

  return <FontText>App is loading...</FontText>;
}
