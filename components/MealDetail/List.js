import { Text, View, StyleSheet } from "react-native";

export default function List({ data }) {
  const arrData = data.slice(1);
  return arrData.map((dataPoint) => (
    <View key={dataPoint} style={styles.listItem}>
      <Text style={styles.itemText}>{dataPoint.replace(/\n/g, "")}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "#8ed596",
    borderRadius: 6,
    padding: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    alignItems: "center",
  },
  itemText: {
    textAlign: "center",
  },
});
