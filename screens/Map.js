import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { RestaurantContext } from '../context/RestaurantContext';

const Map = () => {
  const { restaurants, location } = useContext(RestaurantContext);

  const { latitude, longitude } = location.coords;

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
        {restaurants.map(
          ({ place_id, name, vicinity, geometry: { location } }) => (
            <Marker
              key={place_id}
              coordinate={{
                latitude: location.lat,
                longitude: location.lng,
              }}
              title={name}
              description={vicinity}
            />
          )
        )}
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
