import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import { theme } from "./color";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import * as Font from "expo-font";
import { SelectList } from "react-native-dropdown-select-list";
import CheckBox from "react-native-check-box";
import React from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const foods = [
  { key: "1", value: "한식" },
  { key: "2", value: "중식" },
  { key: "3", value: "양식" },
  { key: "4", value: "일식" },
  { key: "5", value: "멕시칸 음식" },
  { key: "6", value: "스페인 음식" },
  { key: "7", value: "이탈리안 음식" },
  { key: "8", value: "퓨전 음식" },
  { key: "9", value: "태국 음식" },
  { key: "10", value: "베트남 음식" },
];

const includeMeat = [
  { key: "1", value: "채식" },
  { key: "2", value: "고기포함" },
  { key: "3", value: "상관없음" },
];

const foodNum = [
  { key: "1", value: "5가지" },
  { key: "2", value: "7가지" },
  { key: "3", value: "10가지" },
];

export default function App() {
  const [food, setFood] = React.useState("");
  const [meat, setMeat] = React.useState("");
  const [num, setNum] = React.useState("");
  const [milkCheck, setMilkCheck] = React.useState(false);
  const [dietCheck, setDeitCheck] = React.useState(false);

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
          <View style={styles.filterbar}>
            <View style={styles.filterFood}>
              <Text>음식종류 </Text>
              <SelectList
                setSelected={setFood}
                data={foods}
                defaultOption={{ key: "1", value: "한식" }}
              ></SelectList>
            </View>
            <View style={styles.filterMeat}>
              <Text>고기포함 </Text>
              <SelectList
                setSelected={setMeat}
                data={includeMeat}
                defaultOption={{ key: "3", value: "상관없음" }}
              ></SelectList>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", marginRight: 10, marginLeft: 30 }}
            >
              <Text>유제품 포함 </Text>
              <CheckBox
                isChecked={milkCheck}
                onClick={() => setMilkCheck(!milkCheck)}
              />
            </View>
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <Text>다이어트 </Text>
              <CheckBox
                isChecked={dietCheck}
                onClick={() => setDeitCheck(!dietCheck)}
              />
            </View>
            <View style={styles.filterFood}>
              <Text>추천 개수 </Text>
              <SelectList
                setSelected={setNum}
                data={foodNum}
                defaultOption={{ key: "1", value: "5가지" }}
              ></SelectList>
            </View>
          </View>
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
