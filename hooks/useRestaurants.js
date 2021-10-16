import { useEffect, useState } from 'react';
import { GOOGLE_API_KEY } from '@env';

export const useRestaurants = (location, radius) => {
  const [restaurants, setRestaraunts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check location has been retrieved from device
    if (!location || !radius) {
      setError("Can't get location of device");
      return;
    }

    const { lat, lng } = location;

    (async () => {
      setError(null);
      setLoading(true);

      // 1st request the nearest restaurants, five results are returned to prevent too many API request when requesting images
      const rests = await fetchRestaurants(lat, lng, radius);

      if (!rests) {
        setLoading(false);
        return;
      }

      const restaurantsWithPhotos = await fetchRestaurantPhotos(rests);

      setRestaraunts(restaurantsWithPhotos);
      setLoading(false);
    })();
  }, [location, radius]);

  return {
    restaurants,
    loading,
    error,
  };
};

// TODO: Better error handling
const fetchRestaurants = async (lat, lng, radius, limit = 5) => {
  // Build URL
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${radius}&type=restaurant&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    // Check request has results
    if (data.status !== 'OK') {
      return [];
    }

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

        return {
          ...restaurant,
          imageUrl: '',
        };
      }
    })
  );

  return restaurantsWithPhotos;
};
