import React from 'react';
import { FlatList, View } from 'react-native';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => {
  const Item = ({ item: { name, rating, place_id, vicinity, imageUrl } }) => (
    <View style={{ marginBottom: 32, paddingHorizontal: 2 }} key={place_id}>
      <RestaurantCard
        title={name}
        rating={rating}
        address={vicinity}
        isFavourite={false}
        imageUrl={imageUrl}
      />
    </View>
  );

  return (
    <FlatList
      data={restaurants}
      renderItem={Item}
      keyExtractor={(item) => item.place_id}
    />
  );
};

export default RestaurantList;
