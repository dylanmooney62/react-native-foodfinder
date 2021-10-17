import { useEffect, useState } from 'react';
import { GOOGLE_API_KEY } from '@env';

export const useRestaurants = (latitude, longitude, radius) => {
  const [restaurants, setRestaraunts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check location has been retrieved from device
    if (!latitude || !longitude || !radius) {
      setError("Can't get location of device");
      return;
    }

    (async () => {
      setError(null);
      setLoading(true);

      // 1st request the nearest restaurants, five results are returned to prevent too many API request when requesting images
      const rests = await fetchRestaurants(latitude, longitude, radius);

      if (!rests) {
        setLoading(false);
        return;
      }

      const restaurantsWithPhotos = await fetchRestaurantPhotos(rests);

      setRestaraunts(restaurantsWithPhotos);
      setLoading(false);
    })();
  }, [latitude, longitude, radius]);

  return {
    restaurants,
    loading,
    error,
  };
};

// TODO: Better error handling
const fetchRestaurants = async (latitude, longitude, radius, limit = 5) => {
  // Build URL
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=${radius}&type=restaurant&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    return data.results.slice(0, limit);
  } catch (error) {
    console.error(error);
  }
};

// TODO: Better error handling
const fetchRestaurantPhotos = async (restaurants, maxWidth) => {
  // Loops through all restaurants in array and requests image url for each one, and url and set as imageUrl property
  const restaurantsWithPhotos = await Promise.all(
    restaurants.map(async (restaurant) => {
      try {
        const photoRef = restaurant.photos[0].photo_reference;

        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${photoRef}&key=${GOOGLE_API_KEY}`;

        const response = await fetch(url);

        return {
          ...restaurant,
          imageUrl: response.url,
        };
      } catch (error) {
        console.error(error);
      }
    })
  );

  return restaurantsWithPhotos;
};
