import React, { useContext } from 'react';
import { Text } from 'react-native';
import { FavouritesContext } from '../context/FavouritesContext';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCardList from '../components/RestaurantCardList';

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);
  const { location } = useContext(RestaurantContext);

  if (favourites.length === 0) {
    return <Text>No favourites found!</Text>;
  }

  return <RestaurantCardList restaurants={favourites} location={location} />;
};

export default Favourites;
