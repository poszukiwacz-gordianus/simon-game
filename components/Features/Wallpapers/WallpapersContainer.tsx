import { FlatList, StyleSheet, View } from "react-native";
import FontText from "@/components/UI/FontText";
import WallpaperCard from "./WallpaperCard";
import { useStoreContext } from "@/context/StoreContext";
import FilterWallpapers from "./FilterWallpapers";
import { useState } from "react";

export default function WallpapersContainer() {
  const [filter, setFilter] = useState<"all" | "unlocked" | "owned">("all");

  const {
    state: { tilesSets },
  } = useStoreContext();

  let wallpapers = tilesSets
    .map((set) =>
      set.tiles.map((tile, index) => ({
        setId: set.id,
        setName: set.setName,
        wallpaper: set.wallpapers[index],
        tile: tile,
      }))
    )
    .flat();

  switch (filter) {
    case "unlocked":
      wallpapers = wallpapers.filter(
        (wallpaper) => wallpaper.wallpaper.isUnlocked
      );
      break;

    case "owned":
      wallpapers = wallpapers.filter(
        (wallpaper) => wallpaper.wallpaper.isDownloaded
      );
      break;

    default:
      wallpapers = wallpapers;
      break;
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <View>
            <FontText style={styles.header}>Wallpapers</FontText>
            <FilterWallpapers currentFilter={filter} onFilter={setFilter} />
          </View>
        }
        data={wallpapers}
        keyExtractor={(item) => String(item.tile)}
        renderItem={({ item }) => <WallpaperCard item={item} />}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        numColumns={4}
        columnWrapperStyle={styles.row}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    marginTop: 50,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 24,
    marginVertical: 10,
    textAlign: "left",
    paddingLeft: 10,
  },
  flatListContainer: {
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 5,
  },
});
