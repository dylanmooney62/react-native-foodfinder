import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../theme';

import Navigation from '../assets/icons/navigation.svg';
import Rating from './Rating';
import Star from '../assets/icons/star-fill.svg';
import StarOutline from '../assets/icons/star-outline.svg';
import IconButton from './IconButton';
import ImageGradient from './ImageGradient';

const RestaurantCard = ({ restaurant, isFavourite, onFavourite, distance }) => {
  const { name, rating, vicinity, imageUrl } = restaurant;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.distance}>
          <Navigation fill={'#fff'} width={16} height={16} />
          <Text style={{ color: 'white', fontSize: 16, marginLeft: 12 }}>
            {distance}miles
          </Text>
        </View>
        <View style={styles.favourite}>
          <IconButton
            Icon={
              isFavourite ? (
                <Star fill={COLORS.gold} width={32} height={32} />
              ) : (
                <StarOutline fill={'#FFF'} width={32} height={32} />
              )
            }
            onPress={() => onFavourite(restaurant)}
          />
        </View>
        <ImageGradient src={imageUrl} />
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.address}>{vicinity}</Text>
        </View>
        <Rating value={Math.floor(rating)} />
      </View>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    shadowColor: '#faf',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  header: {
    position: 'relative',
    height: 200,
  },
  favourite: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 300,
  },
  distance: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    right: 0,
    top: 0,
    zIndex: 300,
    padding: 12,
  },
  body: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    fontFamily: 'Ubuntu_400Regular',
    flexWrap: 'wrap',
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 12,
    color: COLORS.black,
    fontFamily: 'Ubuntu_700Bold',
  },
});
