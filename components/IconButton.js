import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const IconButton = ({ style = {}, backgroundColor, Icon, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles(backgroundColor).button, style]}
      {...props}
    >
      {Icon}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = (backgroundColor, width, height) =>
  StyleSheet.create({
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      width: 50,
      height: 50,
      backgroundColor: backgroundColor || 'transparent',
    },
  });
