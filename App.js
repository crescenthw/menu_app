import { StyleSheet, Text, View, StatusBar } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import ChatGPT from "./src/gpt";
import StatusMenu from "./src/StatusNav";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <View style={{ flex: 1 }}>
        <View style={styles.statusView}>
          <StatusMenu />
        </View>
        <View style={styles.mainView}>
          <ChatGPT />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#74aa9c",
  },
  statusView: {
    flex: 1.5,
  },
  mainView: {
    flex: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    opacity: 0.8,
    backgroundColor: "white",
  },
  filterbar: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  filterFood: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "10%",
  },
  filterMeat: { flexDirection: "row", alignItems: "center" },
});
