import FontText from "@/components/UI/FontText";
import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, View } from "react-native";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Unlocked", value: "unlocked" },
  { label: "Owned", value: "owned" },
] as const;

export default function FilterWallpapers({
  currentFilter,
  onFilterChange,
}: {
  currentFilter: "all" | "unlocked" | "owned";
  onFilterChange: (filter: "all" | "unlocked" | "owned") => void;
}) {
  return (
    <View style={styles.container}>
      {FILTERS.map(({ label, value: filterValue }) => (
        <Pressable
          key={filterValue}
          style={[
            styles.button,
            {
              backgroundColor:
                currentFilter === filterValue
                  ? Colors.buttonPrimary
                  : Colors.buttonSecondary,
            },
          ]}
          onPress={() => onFilterChange(filterValue)}
        >
          <FontText style={styles.label}>{label}</FontText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
  },
});
