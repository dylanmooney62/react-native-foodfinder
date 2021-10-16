import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});

      setLocation({
        lat: coords.latitude,
        lng: coords.longitude,
      });

      setLoading(false);
    })();
  }, []);

  return {
    location,
    error,
    loading,
  };
};
