import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ flex: 1 }}>
        <View style={styles.statusView}>
          <Text>New Chat</Text>
        </View>
        <View style={styles.mainView}>
          <Text>GPT API</Text>
        </View>
        <View style={styles.inputBar}>
          <TextInput placeholder={"내용을 입력하세요"} style={styles.input} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 25,
  },
  statusView: {
    flex: 1,
    backgroundColor: "#74aa9c",
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  mainView: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBar: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "grey",
    borderOpacity: 0.8,
  },
  input: {
    height: 50,
    width: "95%",
    borderColor: "#5a67ea",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
});
