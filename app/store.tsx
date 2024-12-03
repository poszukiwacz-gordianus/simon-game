import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStoreContext } from "@/context/StoreContext";
import BackButton from "@/components/Icons/BackButton";
import FontText from "@/components/UI/FontText";
import StoreCard from "@/components/Features/Store/StoreCard";
import StoreBuyModal from "@/components/Features/Store/StoreBuyModal";
import BackgroundColor from "@/components/UI/BackgroundColor";

export default function Store() {
  const {
    state: { tilesSets },
  } = useStoreContext();

  return (
    <BackgroundColor>
      <SafeAreaView style={styles.container}>
        <FontText style={styles.header}>Store</FontText>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {tilesSets.map((set, index) => (
            <StoreCard key={index} tileSet={set} />
          ))}
        </ScrollView>

        <View style={{ height: 150 }} />

        <BackButton
          style={{
            position: "absolute",
            bottom: 50,
            left: 50,
          }}
        />

        <StoreBuyModal />
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
  scrollViewContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
});
