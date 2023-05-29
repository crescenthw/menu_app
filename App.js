import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GPTScreen from "./screen/GPTScreen";
import MenuScreen from "./screen/MenuScreen";
import FontDancing from "./fonts/FontDancing";
import SplashScreen from "./screen/SplashScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavoritesScreen from "./screen/FavoritesScreen";
import FavoritesContextProvider from "./store/context/favorites-context";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// import "react-native-gesture-handler";
// import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#74aa9c",
        },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#f3f6fc" },
        headerTitleAlign: "center",
        tabBarItemStyle: { flexDirection: "row" },
        tabBarIndicatorStyle: { backgroundColor: "teal", height: 3 },
        tabBarActiveTintColor: "teal",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Chatting"
        component={GPTScreen}
        options={{
          tabBarLabel: "채팅",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "즐겨찾기",
          tabBarIcon: ({ color }) => (
            <AntDesign name="staro" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  FontDancing();
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 스플래시 화면을 표시한 후 일정 시간(예: 3초) 후에 자동으로 숨김
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#74aa9c",
              },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#f3f6fc" },
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name="ChatScreen"
              component={TabNavigator}
              options={{
                title: "PlatePal ",
                headerTitleStyle: {
                  fontFamily: "DancingScript_600SemiBold", //font 종류
                  fontSize: 30,
                  fontWeight: "600",
                },
              }}
            />
            <Stack.Screen
              name="MenuScreen"
              component={MenuScreen}
              options={{
                title: "음식정보",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}
