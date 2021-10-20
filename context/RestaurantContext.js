import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from '../hooks/useLocation';
import { GOOGLE_API_KEY } from '@env';

const PLACES_URL =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const IMAGES_URL = `https://maps.googleapis.com/maps/api/place/photo`;

export const RestaurantContext = createContext([]);

export const RestaurantProvider = ({ children }) => {
  const { location, error: locationError } = useLocation();

  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    if (!location) {
      return;
    }

    if (locationError) {
      setError(locationError);
      setLoading(false);
      return;
    }

    const lat = location.coords.latitude;
    const lng = location.coords.longitude;

    (async () => {
      try {
        // Fetch restaurants within 1500 radius of location of device
        const { results } = await fetch(
          `${PLACES_URL}?location=${lat}%2C${lng}&radius=${1500}&type=restaurant&key=${GOOGLE_API_KEY}`
        ).then((res) => res.json());

        // Loop through and request image for all restaurants
        const restaurantData = await Promise.all(
          // Results has been sliced to prevent large number of requests for protoype applicaiton
          results.slice(0, 2).map(async (restaurant) => {
            const ref = restaurant.photos[0].photo_reference;

            try {
              const { url } = await fetch(
                `${IMAGES_URL}?maxwidth=1000&photo_reference=${ref}&key=${GOOGLE_API_KEY}`
              );

              return {
                ...restaurant,
                imageUrl: url,
              };
            } catch (error) {
              console.log(error);
              setError('Could not fetch images for restaurants');
            }
          })
        );

        setRestaurants(restaurantData);
        setLoading(false);

        return restaurantData;
      } catch (error) {
        setError('Could not fetch data for restaurants');
        setLoading(false);
        setRestaurants([]);
        console.log(error);
      }
    })();
  }, [location]);

  return (
    <RestaurantContext.Provider
      value={{ restaurants, loading, error, location }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
