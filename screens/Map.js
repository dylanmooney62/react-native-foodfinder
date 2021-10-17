import React, { useContext } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LocationContext } from '../context/LocationContext';
import { useRestaurants } from '../hooks/useRestaurants';
import { Marker } from 'react-native-maps';

const Map = () => {
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {restaurants.map(({ name, vicinity, geometry: { location } }, idx) => (
          <Marker
            key={idx}
            coordinate={{
              latitude: location.lat,
              longitude: location.lng,
            }}
            title={name}
            description={vicinity}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 64,
  },
});
