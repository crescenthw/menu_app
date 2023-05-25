import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import App from "../App";

export default (props) => {
  const [fontsLoaded] = useFonts({
    "DancingScript-Regular": require("../assets/font/DancingScript-Regular.ttf"),
    "DancingScript-Bold": require("../assets/font/DancingScript-Bold.ttf"),
    "DancingScript-Italic": require("../assets/font/DancingScript-Italic.ttf"),
    "DancingScript-Medium": require("../assets/font/DancingScript-Medium.ttf"),
    // Add other font weights and styles if needed
  });

  if (!fontsLoaded) {
    return null; // Render a loading indicator or placeholder while fonts are loading
  }

  return <App />;
};
