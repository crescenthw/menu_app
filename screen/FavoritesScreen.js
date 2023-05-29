import { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { FavoritesContext } from "../store/context/favorites-context";
import { imgData } from "../data/img-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

function FavoritesScreen() {
  const favoriteMealsCtx = useContext(FavoritesContext);
  let favoriteImgUrl = "";

  for (let i = 0; i < imgData.length; i++) {
    const titleValue = imgData[i].title;

    // Check if titleValue exists in array1
    if (favoriteMealsCtx.ids.includes(titleValue)) {
      favoriteImgUrl = imgData[i].img;
    }
  }

  const saveMenu = async (menu, menuImg) => {
    await AsyncStorage.setItem("@menu", JSON.stringify(menu));
    await AsyncStorage.setItem("@menImg", JSON.stringify(menuImg));
  };

  const LoadMenu = async () => {
    const s = await AsyncStorage.getItem("@menu");
  };

  useEffect(() => {
    LoadMenu();
  }, []);

  saveMenu(favoriteMealsCtx.ids, favoriteImgUrl);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mealItem}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2016/10/25/13/29/smoked-salmon-salad-1768890_1280.jpg",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>연어 셀러드</Text>
      </View>

      <View style={styles.mealItem}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>디럭스버거</Text>
      </View>

      {favoriteMealsCtx.ids.map((id, index) => (
        <View key={index} style={styles.mealItem}>
          <Image
            source={{
              uri: favoriteImgUrl,
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{id}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fc",
  },
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
});
