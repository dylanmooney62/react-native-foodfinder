import React from 'react';
import { Text } from 'react-native';
import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from '@expo-google-fonts/ubuntu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/Home';
import Settings from './screens/Settings';
import Map from './screens/Map';
import Favourites from './screens/Favourites';

import HomeIcon from './assets/icons/home.svg';
import MapIcon from './assets/icons/map.svg';
import FavouritesIcon from './assets/icons/star-outline.svg';
import SettingsIcon from './assets/icons/settings.svg';

import { COLORS } from './theme';
import { RestaurantProvider } from './context/RestaurantContext';
import { FavouritesProvider } from './context/FavouritesContext';

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Fonts loading...</Text>;
  }

  return (
    <>
      <FavouritesProvider>
        <RestaurantProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                  height: 64,
                },
                headerStyle: {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  elevation: 0,
                },
                headerTitleStyle: {
                  fontFamily: 'Ubuntu_700Bold',
                  fontSize: 24,
                },
              }}
            >
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <HomeIcon fill={focused ? COLORS.black : COLORS.gray} />
                  ),
                  title: 'FoodFinder',
                }}
              />
              <Tab.Screen
                name="Map"
                component={Map}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <MapIcon fill={focused ? COLORS.black : COLORS.gray} />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Favourites"
                component={Favourites}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <FavouritesIcon
                      fill={focused ? COLORS.black : COLORS.gray}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <SettingsIcon fill={focused ? COLORS.black : COLORS.gray} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </RestaurantProvider>
      </FavouritesProvider>
    </>
  );
}
