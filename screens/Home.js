import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import { FavouritesContext } from '../context/FavouritesContext';
import RestaurantCard from '../components/RestaurantCard';

const Home = () => {
  const { restaurants, loading, error } = useContext(RestaurantContext);
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (restaurants.length === 0) {
    return <Text>No restaurants found!</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={({ item: restaurant }) => {
          const isFavourite = favourites.some(
            ({ place_id }) => place_id === restaurant.place_id
          );

          return (
            <RestaurantCard
              restaurant={restaurant}
              isFavourite={isFavourite}
              onFavourite={toggleFavourite}
            />
          );
        }}
        keyExtractor={(item) => item.place_id}
      />
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
