import { Text } from "react-native";

export default function MenuScreen({ navigation, route }) {
  const detailMenu = route.params.menu;
  return <Text>{detailMenu}</Text>;
}

// import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
// import { MEALS } from "../data/dummy-data";
// import MealDetails from "../components/MealDetails";
// import Subtitle from "../components/MealDetail/Subtitle";
// import List from "../components/MealDetail/List";
// import { useLayoutEffect } from "react";
// import IconButton from "../components/IconButton";

// export default function MealDetailScreen({ route, navigation }) {
//   const mealId = "m1";
//   const selectedMeal = MEALS.find((meal) => meal.id === mealId);

//   function headerButtonPresshandler() {
//     console.log("Pressed!!");
//   }

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: () => {
//         return <IconButton onPress={headerButtonPresshandler} />;
//       },
//     });
//   }, [navigation, headerButtonPresshandler]);

//   return (
//     <ScrollView style={styles.rootContainer}>
//       <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
//       <Text style={styles.title}>{selectedMeal.title}</Text>
//       <MealDetails
//         duration={selectedMeal.duration}
//         complexity={selectedMeal.complexity}
//         affordability={selectedMeal.affordability}
//       />
//       <View style={styles.listOuterContainer}>
//         <View style={styles.listContainer}>
//           <Subtitle>Ingredient</Subtitle>
//           <List data={selectedMeal.ingredients} />
//           <Subtitle>Steps</Subtitle>
//           <List data={selectedMeal.steps} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   rootContainer: {
//     marginBottom: 32,
//   },
//   image: {
//     width: "100%",
//     height: 350,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 24,
//     margin: 8,
//     textAlign: "center",
//   },
//   listOuterContainer: {
//     alignItems: "center",
//   },
//   listContainer: {
//     width: "85%",
//   },
// });
