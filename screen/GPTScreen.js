import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Linking,
  Image, // 추가된 부분
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { GPTLOGO } from "../img/imgSource";

const GPTScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const apiKey = "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";
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const [textInput, setTextInput] = useState("");

  const realText = `${textInput} 위의 조건에 해당하는 음식 5가지를 {번호. 음식 }형태로 추천해주고, 음식이름에 띄어쓰기는 다 붙여서 출력해줘`;

  const handleSend = async () => {
    const prompt = realText;
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

  function pressHandler(word) {
    navigation.navigate("MenuScreen", {
      menu: word,
    });
  }

  // 추가된 부분
  const renderText = (text, type) => {
    if (type === "user") {
      return <Text style={styles.gptText}>{text}</Text>;
    } else if (type === "bot") {
      const words = text.split(" ");
      const elements = words.map((word, index) => {
        if (index < words.length - 1) {
          return (
            <Text key={index} style={styles.gptText}>
              <Text onPress={() => pressHandler(word)}>{word}</Text>{" "}
            </Text>
          );
        } else {
          return (
            <Text key={index} style={styles.gptText}>
              <Text onPress={() => pressHandler(word)}>{word}</Text>
            </Text>
          );
        }
      });
      return <Text>{elements}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View
            style={[
              styles.textLine,
              {
                backgroundColor: item.type === "user" ? "#f3f6fc" : "white",
                alignItems: item.type === "user" ? "center" : "flex-start",
              },
            ]}
          >
            {item.type === "user" ? (
              <View style={styles.avertar}>
                <Feather name="user" size={32} color="white" />
              </View>
            ) : (
              <Image
                source={{ uri: GPTLOGO }}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 20,
                  marginTop: 20,
                  marginLeft: 10,
                }}
              />
            )}
            {renderText(item.text, item.type)}
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
        <View style={{ position: "absolute", right: 18, paddingBottom: 10 }}>
          <TouchableOpacity onPress={handleSend}>
            <FontAwesome
              name="send-o"
              size={24}
              color="#5a67ea"
              style={{ marginRight: 7 }}
            />
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
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 70,
  },
  body: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 35,
  },
  textLine: {
    flexDirection: "row",
    borderRadius: 20,
    width: "100%",
    paddingBottom: 40,
  },
  bot: {
    fontSize: 16,
  },
  avertar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#c1c6fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 10,
  },
  gptText: {
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
    paddingLeft: 15,
    borderRadius: 30,
  },
});
