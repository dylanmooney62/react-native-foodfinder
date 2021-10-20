import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RestaurantCard from './RestaurantCard';
import { getDistance, convertDistance } from 'geolib';
import { useContext } from 'react/cjs/react.development';
import { FavouritesContext } from '../context/FavouritesContext';

const RestaurantCardList = ({ restaurants, location }) => {
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  return (
    <FlatList
      style={styles.container}
      data={restaurants}
      renderItem={({ item: restaurant }) => {
        const isFavourite = favourites.some(
          ({ place_id }) => place_id === restaurant.place_id
        );

        const userLocation = location.coords;
        const restaurantLocation = restaurant.geometry.location;

        const distanceFromLocation = convertDistance(
          getDistance(userLocation, restaurantLocation, 100),
          'mi'
        ).toFixed(1);

        return (
          <RestaurantCard
            restaurant={restaurant}
            isFavourite={isFavourite}
            onFavourite={toggleFavourite}
            distance={distanceFromLocation}
          />
        );
      }}
      keyExtractor={(item) => item.place_id}
    />
  );
};

export default RestaurantCardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
