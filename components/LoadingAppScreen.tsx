import useLoadOnAppStart from "@/hooks/useLoadOnAppStart";
import FontText from "./FontText";

export default function LoadingAppScreen() {
  useLoadOnAppStart();

  return <FontText>App is loading...</FontText>;
}
