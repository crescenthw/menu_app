import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteMenu, setFavoriteMenu] = useState([]);

  function addFavorite(id) {
    setFavoriteMenu((current) => [...current, id]);
  }
  function removeFavorite(id) {
    setFavoriteMenu((current) => current.filter((mealId) => mealId !== id));
  }

  const value = {
    ids: favoriteMenu,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
