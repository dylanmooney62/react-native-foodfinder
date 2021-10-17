import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { LocationContext } from '../context/LocationContext';
import { useRestaurants } from '../hooks/useRestaurants';
import RestaurantList from '../components/RestaurantList';

const Home = () => {
  const { location } = useContext(LocationContext);

  const latitude = location?.latitude;
  const longitude = location?.longitude;

  const { restaurants, loading, error } = useRestaurants(
    latitude,
    longitude,
    1500
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Something went wrong...</Text>;
  }

  if (restaurants.length === 0) {
    return <Text>No restaurants found</Text>;
  }

  return (
    <View style={styles.container}>
      <RestaurantList restaurants={restaurants} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
