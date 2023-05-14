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

export default function MealDetailScreen({ route, navigation }) {
  const menuName = route.params.menu;
  const mealId = "m3";
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const detailText = `${menuName}의 레시피와 재료를 알려줘`;

  function headerButtonPresshandler() {
    console.log("Pressed!!");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton onPress={headerButtonPresshandler} />;
      },
    });
  }, [navigation, headerButtonPresshandler]);

  const handleLinkPress = (text) => {
    const url = `https://www.google.com/maps/search/${text}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{menuName}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredient</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
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
