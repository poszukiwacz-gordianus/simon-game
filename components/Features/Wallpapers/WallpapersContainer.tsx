import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useStoreContext } from "@/context/StoreContext";

import FontText from "@/components/UI/FontText";
import WallpaperCard from "./WallpaperCard";
import FilterWallpapers from "./FilterWallpapers";

export default function WallpapersContainer() {
  const [currentFilter, setCurrentFilter] = useState<
    "all" | "unlocked" | "owned"
  >("all");

  const {
    state: { tilesSets },
  } = useStoreContext();

  // Get all available wallpapers
  const wallpapers = tilesSets.flatMap((set) =>
    set.tiles.map((tile, index) => ({
      wallpaper: set.wallpapers[index],
      imageUrl: tile,
    }))
  );

  // Filter wallpapers
  const filteredWallpapers = (() => {
    switch (currentFilter) {
      case "unlocked":
        return wallpapers.filter(({ wallpaper }) => wallpaper.isUnlocked);

      case "owned":
        return wallpapers.filter(({ wallpaper }) => wallpaper.isDownloaded);

      default:
        return wallpapers;
    }
  })();

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <View>
            <FontText style={styles.header}>Wallpapers</FontText>
            <FilterWallpapers
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
            />
          </View>
        }
        data={filteredWallpapers}
        keyExtractor={({ wallpaper }) => String(wallpaper.id)}
        renderItem={({ item: { wallpaper, imageUrl } }) => (
          <WallpaperCard imageUrl={imageUrl} id={wallpaper.id} />
        )}
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
