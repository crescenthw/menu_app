// import { Text } from "react-native";

// export default function MenuScreen({ navigation, route }) {
//   const detailMenu = route.params.menu;
//   return <Text>{detailMenu}</Text>;
// }

import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Pressable,
  Linking,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { AntDesign } from "@expo/vector-icons";

export default function MealDetailScreen({ route, navigation }) {
  const menuName = route.params.menu;
  const mealId = "m3";
  const GptText = route.params.text; //추가
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const detailText = `${menuName}의 레시피와 재료를 알려줘`;
  const ingredientStartIndex = GptText.indexOf("[재료]");
  const ingredientEndIndex = GptText.indexOf("[레시피]");

  const recipeStartIndex = GptText.indexOf("[레시피]");
  const recipeEndIndex = GptText.length;

  let filteredText = GptText;
  let ingredientText = "";
  let recipeText = "";

  if (ingredientStartIndex > -1 && ingredientEndIndex > -1) {
    ingredientText = GptText.slice(
      ingredientStartIndex + 4,
      ingredientEndIndex
    );
    filteredText = filteredText.replace(ingredientText, "");
  }

  if (recipeStartIndex > -1 && recipeEndIndex > -1) {
    recipeText = GptText.slice(recipeStartIndex + 5, recipeEndIndex);
    filteredText = filteredText.replace(recipeText, "");
  }

  function headerButtonPresshandler() {
    console.log("Pressed!!");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <AntDesign name="staro" size={28} color="white" />;
      },
    });
  }, [navigation, headerButtonPresshandler]);

  const handleLinkPress = (text) => {
    const url = `https://www.google.com/maps/search/${text}`;
    console.log(text);
    Linking.openURL(url);
  };

  const arrIngredientText = ingredientText.split("-");
  const arrRecipeText = recipeText.split(/\d+\.\s/).filter(Boolean);
  console.log(arrIngredientText);
  console.log(arrRecipeText);

  const realIngredientText = arrIngredientText.slice(1);
  const realRecipeText = arrRecipeText.slice(1);

  console.log(realIngredientText);
  console.log(realRecipeText);

  return (
    <ScrollView style={styles.rootContainer}>
      <Text style={styles.title}>{menuName}</Text>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>재료</Subtitle>
          <List data={realIngredientText} />
          <Subtitle>레시피</Subtitle>
          <List data={realRecipeText} />
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.buttonView,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={() => handleLinkPress(menuName)}
      >
        <Text style={styles.btnText}>Search to google Map</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    marginTop: 40,
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "85%",
  },
  buttonView: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#5a67ea",
    borderRadius: 30,
    margin: 10,
    marginTop: 20,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
