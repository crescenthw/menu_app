import React, { useState, useCallback, useEffect } from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { GPTLOGO } from "../img/imgSource";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

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

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

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
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      placeholder="내용을 입력하세요"
    />
  );
}
