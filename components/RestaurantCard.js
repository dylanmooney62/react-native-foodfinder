import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../theme';

import Navigation from '../assets/icons/navigation.svg';
import Rating from './Rating';
import Star from '../assets/icons/star-fill.svg';
import StarOutline from '../assets/icons/star-outline.svg';
import IconButton from './IconButton';
import ImageGradient from './ImageGradient';

const RestaurantCard = ({ title, rating, address, isFavourite, imageUrl }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.distance}>
          <Navigation fill={'#fff'} width={16} height={16} />
          <Text style={{ color: 'white', fontSize: 16, marginLeft: 12 }}>
            0.1m
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
          />
        </View>
        <ImageGradient src={imageUrl} />
      </View>
      <View style={styles.details}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Rating value={Math.floor(rating)} />
        </View>
        <View style={styles.buttons}>
          <Text style={styles.address}>{address}</Text>
          <IconButton
            backgroundColor={COLORS.black}
            Icon={<Navigation fill="#FFF" />}
          />
        </View>
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
  },
  details: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 16,
    marginBottom: 12,
    color: COLORS.black,
    fontFamily: 'Ubuntu_500Medium',
  },
  img: {
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttons: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  header: {
    position: 'relative',
    height: 200,
  },
  address: {
    fontFamily: 'Ubuntu_400Regular',
    flexWrap: 'wrap',
    flex: 1,
  },
  favourite: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 300,
  },
});
