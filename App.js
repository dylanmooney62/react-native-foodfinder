import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from '@expo-google-fonts/ubuntu';
import RestaurantList from './components/RestaurantList';
import { useLocation } from './hooks/useLocation';
import { useRestaurants } from './hooks/useRestaurants';

export default function App() {
  const { location, error: locationErr } = useLocation();
  const { restaurants, loading, error } = useRestaurants(location, 1500);

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Fonts loading...</Text>;
  }

  if (loading) {
    <Text>Loading...</Text>;
  }

  if (error || locationErr) {
    return <Text>{error || locationErr}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoodFinder</Text>
      <RestaurantList restaurants={restaurants} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontFamily: 'Ubuntu_700Bold',
  },
  item: {
    backgroundColor: 'red',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
