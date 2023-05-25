import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Linking,
  Image,
  ScrollView, // 추가된 부분
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { GPTLOGO } from "../img/imgSource";

const GPTScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const apiKey = "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";
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const [textInput, setTextInput] = useState("");
  const realText = `${textInput} 위의 조건에 해당하는 음식 5가지를 추천해줘, 출력형식은 {번호. 음식(줄바꿈)} 형식으로 출력하고, 음식이름에 띄어쓰기는 다 붙여서 출력해줘`;

  const handleSend = async () => {
    try {
      const question = realText;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: question }],
        }),
      });
      const responseData = await response.json();
      const text = responseData.choices[0].message.content;
      setData([
        ...data,
        { type: "user", text: textInput },
        { type: "bot", text: text },
      ]);
      setTextInput("");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  // 추가된 부분
  const handleLinkPress = (text) => {
    const url = `https://www.google.com/maps/search/${text}`;
    Linking.openURL(url);
  };

  const pressHandler = async (word) => {
    try {
      console.log("pressed!!");
      const PressWord = `${word}의 [재료]와 [레시피] 형식으로 알려줘.`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: PressWord }],
        }),
      });

      const responseData = await response.json();
      const PressText = responseData.choices[0].message.content;

      navigation.navigate("MenuScreen", {
        menu: word,
        text: PressText,
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  // 추가된 부분
  const renderText = (text, type) => {
    if (type === "user") {
      return <Text style={styles.gptText}>{text}</Text>;
    } else if (type === "bot") {
      const words = text.split("\n");
      const elements = words.map((word, index) => {
        const extractedWord = word.replace(/[0-9.]/g, "");
        return (
          <Text
            key={index}
            style={[styles.gptText, { paddingTop: 5 }]}
            onPress={() => pressHandler(extractedWord)}
          >
            {word}
          </Text>
        );
      });
      return elements;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        ListHeaderComponent={
          <View style={styles.sampleTextView}>
            <Text style={styles.sampleTitle}>GPT 사용예시</Text>
            <Text></Text>
            <Text
              style={[
                styles.sampleText,
                { fontWeight: "600", marginBottom: 10 },
              ]}
            >
              1. 집에서 만들어 먹을 때
            </Text>
            <Text style={styles.sampleText}>
              "나는 지금 감자, 돼지고기, 당근을 가지고 있고, {"\n"}해당 음식은
              가족과 함께 저녁식사로 먹을 예정이야. {"\n"}우리가족은 한식을
              선호해"
            </Text>
            <Text></Text>
            <Text
              style={[
                styles.sampleText,
                { fontWeight: "600", marginBottom: 10 },
              ]}
            >
              2. 배달 또는 식당에서 먹을 때
            </Text>
            <Text style={styles.sampleText}>
              "나는 한식을 먹고싶고, 돼지고기나{"\n"} 소고기가 들어간 음식을
              먹고 싶어"
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.textLine,
              {
                backgroundColor: item.type === "user" ? "#f3f6fc" : "white",
                alignItems: item.type === "user" ? "center" : "flex-start",
                marginTop: item.type === "user" ? 20 : 0,
                paddingTop: item.type === "user" ? 0 : 20,
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
                  marginLeft: 10,
                }}
              />
            )}
            <View style={{ width: "82%" }}>
              {renderText(item.text, item.type)}
            </View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 70,
  },
  sampleTextView: {
    marginLeft: 7,
    marginRight: 7,
    borderRadius: 20,
    paddingBottom: 20,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 35,
    paddingTop: 10,
  },
  sampleTitle: {
    textAlign: "center",
    fontSize: 20,
  },
  sampleText: {
    fontSize: 16,
    textAlign: "center",
  },
  body: {
    marginLeft: 7,
    marginRight: 7,
  },

  textLine: {
    borderRadius: 20,
    width: "100%",
    paddingBottom: 20,
    paddingRight: 10,
    flexDirection: "row",
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
    fontSize: 18,
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
    paddingRight: 45,
  },
});
