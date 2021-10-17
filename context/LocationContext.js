import React, { createContext } from 'react';
import { useLocation } from '../hooks/useLocation';

export const LocationContext = createContext({});

export const LocationProvider = ({ children }) => {
  // TODO: Refresh functionality
  const { location } = useLocation();

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};
