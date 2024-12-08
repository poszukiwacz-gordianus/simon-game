import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStoreContext } from "@/context/StoreContext";
import BackButton from "@/components/Icons/BackButton";
import FontText from "@/components/UI/FontText";
import StoreCard from "@/components/Features/Store/StoreCard";
import StoreBuyModal from "@/components/Features/Store/StoreBuyModal";
import BackgroundColor from "@/components/UI/BackgroundColor";
import Coins from "@/components/UI/Coins";

export default function Store() {
  const {
    state: { tilesSets },
  } = useStoreContext();

  return (
    <BackgroundColor>
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponent={<FontText style={styles.header}>Store</FontText>}
          contentContainerStyle={styles.flatListContainer}
          data={tilesSets}
          renderItem={({ item }) => <StoreCard tileSet={item} />}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false} // hides the scroll bar
        />

        <View style={{ height: 150 }} />

        <BackButton
          style={{
            position: "absolute",
            bottom: 50,
            left: 50,
          }}
        />

        <StoreBuyModal />
        <Coins />
      </SafeAreaView>
    </BackgroundColor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 40,
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },
  flatListContainer: {
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
