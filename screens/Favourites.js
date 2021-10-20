import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FavouritesContext } from '../context/FavouritesContext';
import RestaurantCard from '../components/RestaurantCard';

const Favourites = () => {
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={favourites}
        renderItem={({ item: restaurant }) => (
          <RestaurantCard
            restaurant={restaurant}
            isFavourite={true}
            onFavourite={toggleFavourite}
          />
        )}
        keyExtractor={(item) => item.place_id}
      />
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
