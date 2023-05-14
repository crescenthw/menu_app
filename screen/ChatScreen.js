import React, { useState, useCallback, useEffect } from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { GPTLOGO } from "../img/imgSource";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState([]);
  const apiKey = "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";
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";

  const realText = `나는 한식을 선호하고, 돼지고기가 들어간 음식을 선호해. 오늘은 ${messages} 위의 조건에 해당하는 음식 5가지를 번호: 음식 형태로 추천해줄래?`;

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));

    const requestData = {
      context: newMessages[0].text,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: "Complete this sentence: " + requestData.context,
        max_tokens: 50,
        temperature: 0.5,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const aiResponse = data.choices[0].text;
        const newResponse = {
          _id: Math.round(Math.random() * 1000000),
          text: aiResponse,
          createdAt: new Date(),
          user: {
            _id: 2, // Set to a different ID to differentiate from the user's messages
            name: "AI",
            avatar: "https://placeimg.com/140/140/any",
          },
        };
        setMessages(GiftedChat.append(messages, [newResponse]));
      })
      .catch((error) => console.log(error));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#74aa9c",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "어떤 메뉴를 원하시나요?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: GPTLOGO,
        },
      },
    ]);
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <FontAwesome
            name="send-o"
            size={24}
            color="#5a67ea"
            style={{ marginBottom: 10, marginRight: 10 }}
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="arrow-down" size={24} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      renderSend={renderSend}
      alwaysShowSend
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      placeholder="내용을 입력하세요"
      textInputStyle={{
        backgroundColor: "white",
        borderColor: "#5a67ea",
        borderWidth: 2,
        borderRadius: 30,
        padding: 10,
        marginRight: 5,
      }}
    />
  );
}
