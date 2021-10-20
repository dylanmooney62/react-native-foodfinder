import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';

export const FavouritesContext = createContext([]);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const { getItem, setItem } = useAsyncStorage('@favourites');

  useEffect(() => {
    (async () => {
      await AsyncStorage.clear();

      const data = await getItem();

      if (data !== null) {
        setFavourites(JSON.parse(data));
      }
    })();
  }, []);

  const toggleFavourite = async (restaurant) => {
    let updatedFavourites = [];

    if (!favourites.some(({ place_id }) => place_id === restaurant.place_id)) {
      updatedFavourites = [...favourites, restaurant];
    } else {
      updatedFavourites = favourites.filter(
        ({ place_id }) => place_id !== restaurant.place_id
      );
    }

    await setItem(JSON.stringify(updatedFavourites));

    setFavourites(updatedFavourites);
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
