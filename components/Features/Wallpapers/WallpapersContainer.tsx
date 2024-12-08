import { FlatList, StyleSheet } from "react-native";
import FontText from "@/components/UI/FontText";
import WallpaperCard from "./WallpaperCard";
import { useStoreContext } from "@/context/StoreContext";

export default function WallpapersContainer() {
  const {
    state: { tilesSets },
  } = useStoreContext();

  const wallpapers = tilesSets
    .map((set) =>
      set.tiles.map((tile, index) => ({
        tile: tile,
        wallpaper: set.wallpapers[index],
      }))
    )
    .flat();

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <FontText style={styles.header}>Wallpapers</FontText>
        }
        data={wallpapers}
        keyExtractor={(item) => String(item.tile)}
        renderItem={({ item }) => <WallpaperCard item={item} />}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    marginTop: 50,
    marginBottom: 20,
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
    marginBottom: 10,
  },
});
