import React, { createContext, useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import * as Location from 'expo-location';

export const LocationContext = createContext({});

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});

      setLocation(coords);
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ location, error }}>
      {children}
    </LocationContext.Provider>
  );
};
