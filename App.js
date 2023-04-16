import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import { theme } from "./color";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import * as Font from "expo-font";
import { SelectList } from "react-native-dropdown-select-list";
import CheckBox from "react-native-check-box";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor={theme.bg} />
      <View style={{ flex: 1 }}>
        <View style={styles.statusView}>
          <Text style={styles.statusText}>메뉴추천</Text>
          <SimpleLineIcons name="menu" size={30} color={theme.bg} />
        </View>
        <View style={styles.mainView}>
          <Text>GPT API</Text>
        </View>
        <View>
          <SelectList></SelectList>
          <SelectList></SelectList>
          <SelectList></SelectList>
          {/* <CheckBox></CheckBox> */}
        </View>
        <View style={styles.inputBar}>
          <TextInput placeholder={"내용을 입력하세요"} style={styles.input} />
          <FontAwesome
            name="send-o"
            size={24}
            color={theme.input}
            style={{
              position: "absolute",
              paddingLeft: SCREEN_WIDTH - 80,
              paddingBottom: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.teal,
  },
  statusView: {
    flex: 2,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: theme.teal,
  },
  statusText: {
    fontSize: 28,
    fontWeight: "600",
    color: theme.bg,
  },
  mainView: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    opacity: 0.8,
    backgroundColor: theme.bg,
  },
  inputBar: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 10,
    backgroundColor: theme.bg,
    opacity: 0.8,
    borderTopWidth: 1,
    borderColor: "grey",
    borderOpacity: 0.8,
  },
  input: {
    height: 50,
    width: "95%",
    backgroundColor: theme.bg,
    borderColor: theme.input,
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
  },
});
