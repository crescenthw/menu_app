import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Linking, // 추가된 부분
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

const GPTScreen = () => {
  const [data, setData] = useState([]);
  const apiKey = "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";
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const [textInput, setTextInput] = useState("");

  const realText = `나는 한식을 선호하고, 돼지고기가 들어간 음식을 선호해. 오늘은 ${textInput} 위의 조건에 해당하는 음식 5가지를 번호: 음식 형태로 추천해줄래?`;

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

  // 추가된 부분
  const handleLinkPress = (text) => {
    const url = `https://www.google.com/maps/search/${text}`;
    Linking.openURL(url);
  };

  // 추가된 부분
  const renderText = (text, type) => {
    if (type === "user") {
      return <Text>{text}</Text>;
    } else if (type === "bot") {
      const words = text.split(" ");
      const elements = words.map((word, index) => {
        if (index < words.length - 1) {
          return (
            <Text key={index}>
              <Text onPress={() => handleLinkPress(word)} style={styles.link}>
                {word}
              </Text>{" "}
            </Text>
          );
        } else {
          return (
            <Text key={index}>
              <Text onPress={() => handleLinkPress(word)} style={styles.link}>
                {word}
              </Text>
            </Text>
          );
        }
      });
      return <Text>{elements}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text>{"\n"}</Text>
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
              {item.type === "user" ? "User" : "Bot"}
            </Text>
            {renderText(item.text, item.type)}
          </View>
        )}
      />
      <View style={styles.inputBar}>
        <TextInput
          placeholder={"내용을 입력하세요."}
          style={styles.input}
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
        />
        <View style={{ position: "absolute", right: 18, paddingBottom: 10 }}>
          <TouchableOpacity onPress={handleSend}>
            <FontAwesome name="send-o" size={24} color="#5a67ea" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GPTScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
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
    width: "95%",
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
    flexDirection: "row",
    paddingBottom: 10,
    opacity: 0.8,
  },
  input: {
    height: 50,
    width: "95%",
    backgroundColor: "white",
    borderColor: "#5a67ea",
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
  },
});
