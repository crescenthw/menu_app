import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GPTScreen from "./screen/GPTScreen";
import MenuScreen from "./screen/MenuScreen";
import FontDancing from "./fonts/FontDancing";
import SplashScreen from "./screen/SplashScreen";
import GPTLoadingScreen from "./screen/GPTLoadingScreen";

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
            component={GPTScreen}
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
    </>
  );
}
