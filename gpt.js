import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "./color";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ChatGPT = () => {
  const [data, setData] = useState([]);
  const apiKey = "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";
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const [textInput, setTextInput] = useState("");

  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const text = response.data.choices[0].text;
    setData([
      ...data,
      { type: "user", text: textInput },
      { type: "bot", text: text },
    ]);
    setTextInput("");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>메뉴추천</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: item.type === "user" ? "green" : "red",
              }}
            >
              {item.type === "user" ? "Ninza" : "Bot"}
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputBar}>
        <TextInput
          placeholder={"내용을 입력하세요"}
          style={styles.input}
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            paddingLeft: SCREEN_WIDTH - 80,
            paddingBottom: 10,
          }}
          onPress={handleSend}
        >
          <FontAwesome name="send-o" size={24} color={theme.input} />
        </TouchableOpacity>
      </View>
      {/* <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
        placeholder="Ask me anything"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ChatGPT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 70,
  },
  body: {
    margin: 10,
  },
  bot: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "yellow",
    width: "90%",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue",
  },
  inputBar: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    opacity: 0.8,
    flexDirection: "row",
    // borderTopWidth: 1,
    // borderColor: "grey",
    // borderOpacity: 0.8,
  },
  input: {
    height: 50,
    width: SCREEN_WIDTH - 10,
    backgroundColor: theme.bg,
    borderColor: theme.input,
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
  },
});
