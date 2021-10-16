import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Star from '../assets/icons/star-fill.svg';
import { COLORS } from '../theme';

const Rating = ({ value = 0 }) => {
  return (
    <View style={styles.rating}>
      <Text>
        {Array(value)
          .fill()
          .map((_, i) => (
            <Star fill={COLORS.gold} key={i} />
          ))}
      </Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  rating: {
    display: 'flex',
    flexDirection: 'row',
  },
});
