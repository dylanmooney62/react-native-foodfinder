import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ImageGradient = ({
  src,
  imageStyle,
  containerStyle = {},
  gradientColor = ['rgba(0,0,0,0.8)', 'transparent'],
  gradientStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <LinearGradient
        style={[styles.background, gradientStyle]}
        colors={gradientColor}
      />
      <Image
        style={[styles.image, imageStyle]}
        source={{
          uri: src,
        }}
      />
    </View>
  );
};

export default ImageGradient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 200,
    height: '100%',
  },
});
