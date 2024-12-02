import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStoreContext } from "@/context/StoreContext";
import BackButton from "@/components/Icons/BackButton";
import FontText from "@/components/UI/FontText";
import StoreCard from "@/components/Features/Store/StoreCard";
import StoreBuyModal from "@/components/Features/Store/StoreBuyModal";

export default function Store() {
  const {
    state: { tilesSets },
  } = useStoreContext();

  return (
    <SafeAreaView style={styles.container}>
      <FontText style={styles.header}>Store</FontText>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {tilesSets.map((set, index) => (
          <StoreCard key={index} tileSet={set} />
        ))}
      </ScrollView>

      <View style={{ height: 100 }} />

      <BackButton
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
        }}
      />

      <StoreBuyModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c2a664",
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
});
