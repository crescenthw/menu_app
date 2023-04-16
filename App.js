import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { theme } from "./color";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor={theme.bg} />
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
    backgroundColor: theme.bg,
  },
  statusView: {
    flex: 1.2,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.teal,
  },
  mainView: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBar: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "grey",
    borderOpacity: 0.8,
  },
  input: {
    height: 50,
    width: "95%",
    borderColor: theme.input,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
});
