import react from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function StatusMenu() {
  return (
    <View style={styles.statusView}>
      <TouchableOpacity>
        <Feather name="refresh-ccw" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.statusText}>PlatePot</Text>
      <TouchableOpacity>
        <SimpleLineIcons name="menu" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  statusView: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#74aa9c",
    flexDirection: "row",
  },
  statusText: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
  },
});
