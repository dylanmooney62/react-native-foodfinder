import React from 'react';
import { Text } from 'react-native';
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantCardList from '../components/RestaurantCardList';

const Home = () => {
  const { restaurants, loading, error, location } =
    useContext(RestaurantContext);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (restaurants.length === 0) {
    return <Text>No restaurants found!</Text>;
  }

  return <RestaurantCardList restaurants={restaurants} location={location} />;
};

export default Home;
