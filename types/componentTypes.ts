import { LinkProps } from "expo-router";
import { type Animated } from "react-native";
import { TileSet, Wallpapers } from "./types";

export type RulesContent = Array<string>;

export interface ButtonProps {
  buttonText: string;
  href: LinkProps["href"];
  onPress: () => void;
}

export interface AnimatedTile {
  source: string;
  opacity: Animated.Value;
}

export interface RuleProps {
  rule: string;
  index: number;
}

export interface WallpaperProps {
  setId: number;
  setName: string;
  tile: string;
  wallpaper: Wallpapers;
}
