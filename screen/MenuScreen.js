import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Pressable,
  Linking,
  TouchableOpacity,
} from "react-native";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-context";
import { imgData } from "../data/img-data";
import { GOOGLE_MAP_LOGO, RECIPE_LOGO } from "../img/imgSource";

export default function MealDetailScreen({ route, navigation }) {
  const favoriteMealCtx = useContext(FavoritesContext);

  const MenuName = route.params.menu;
  const strmenu = MenuName.split(/[-(),\{\[\]\/:>=]/);
  const splitmenu = strmenu[0];
  const menuName = splitmenu.replace(/[\s\uFEFF\xA0]+/g, "");
  const GptText = route.params.text; //추가
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

  const mealsFavorite = favoriteMealCtx.ids.includes(menuName);

  function headerButtonPresshandler() {
    if (mealsFavorite) {
      favoriteMealCtx.removeFavorite(menuName);
    } else {
      favoriteMealCtx.addFavorite(menuName);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={headerButtonPresshandler}>
            <AntDesign
              name={mealsFavorite ? "star" : "staro"}
              size={28}
              color={mealsFavorite ? "yellow" : "white"}
            />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, headerButtonPresshandler]);

  const handleLinkPress = (text) => {
    const url = `https://www.google.com/maps/search/${text}`;
    Linking.openURL(url);
  };

  const handleRecipePress = (text) => {
    const url = `https://www.10000recipe.com/recipe/list.html?q=${menuName}`;
    Linking.openURL(url);
  };

  const arrIngredientText = ingredientText.split("-");
  const arrRecipeText = recipeText.split(/\d+\.\s/).filter(Boolean);

  for (let i = 0; i < imgData.length; i++) {
    const titleValue = imgData[i].title;

    // Check if titleValue exists in array1
    if (menuName === titleValue) {
      favoriteImgUrl = imgData[i].img;
    }
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: favoriteImgUrl }} style={styles.image} />
      <Text style={styles.title}>{menuName}</Text>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>재료</Subtitle>
          <List data={arrIngredientText} />
          <Subtitle>레시피</Subtitle>
          <List data={arrRecipeText} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={({ pressed }) => [
            styles.buttonView,
            { marginRight: 15 },
            pressed ? styles.buttonPressed : null,
          ]}
          android_ripple={{ color: "#ccc" }}
          onPress={() => handleRecipePress(menuName)}
        >
          <Image source={{ uri: RECIPE_LOGO }} style={styles.logoImg} />
          <Text style={styles.btnText}>More Recipe</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.buttonView,
            pressed ? styles.buttonPressed : null,
          ]}
          android_ripple={{ color: "#ccc" }}
          onPress={() => handleLinkPress(menuName)}
        >
          <Image source={{ uri: GOOGLE_MAP_LOGO }} style={styles.logoImg} />
          <Text style={styles.btnText}>Google Map</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "95%",
    height: 300,
    borderRadius: 15,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 30,
    margin: 10,
    marginTop: 20,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    flexDirection: "row",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#5a67ea",
    marginRight: 3,
  },
  buttonPressed: {
    opacity: 0.5,
    borderRadius: 30,
  },
  logoImg: {
    width: 40,
    height: 40,
    marginRight: 8,
    marginLeft: 5,
    borderRadius: 50,
  },
});
