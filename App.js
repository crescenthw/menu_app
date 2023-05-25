import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatGPT from "./screen/GPTScreen";
import ChooseMenu from "./screen/MenuScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GPTScreen from "./screen/GPTScreen";
import MenuScreen from "./screen/MenuScreen";
import ChatScreen from "./screen/ChatScreen";

// import "react-native-gesture-handler";
// import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="ChatScreen" component={GPTScreen} />
//       <Drawer.Screen name="SetMenu" component={MenuScreen} />
//     </Drawer.Navigator>
//   );
// }

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#74aa9c",
            },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#f3f6fc" },
          }}
        >
          <Stack.Screen
            name="ChatScreen"
            component={GPTScreen}
            options={{
              title: "PlatePal",
              // headerTitleStyle: {
              //   fontFamily: "DancingScript-Bold",
              // },
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
    </>
  );
}
