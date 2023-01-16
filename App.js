import React, { useState, useEffect, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { getHeaders } from './apiHeaders';
import HomeStackScreen from './screens/HomeStackScreen';
import FavouritesScreen from './screens/FavouritesScreen';

// SVGs. Uses react-native-svg-transformer
import HomeIcon from './assets/images/icons/home-icon.svg';
import HeartIcon from './assets/images/icons/menu-heart-icon.svg';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

//custom fonts
const customFonts = {
  'Kodchasan-Bold': require('./assets/fonts/Kodchasan-Bold.ttf'),
  'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
  'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
}

//custom navigation theme. Basic colors used throughout the app.
const MyTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5AA554",
    background: "#F4F4F4",
    card: "#E1EDE0",
    darkCard: "#172117",
    grey: "#6D6D6D",
  },
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  let favourites = []; // Array that will contain all the favourited dishes

  useEffect(() => { // Loads the fonts and gets the headers used for fetch before starting app
    async function prepare() {
      try {
        await Font.loadAsync(customFonts);
        await getHeaders();
      } catch (err) {
        console.warn(err);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {  // doesn't return anything until the app is ready
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer theme={MyTheme} >
        <Tab.Navigator
          screenOptions={({ route }) => ({ 
            headerShown: false,
            tabBarIcon: ({ color, size }) => { // Sets the icons for the screens in the tab navigation
              if (route.name === 'HomeStack') {
                return <HomeIcon width={size} height={size} fill={color}/>
              } else if (route.name === 'Favourites') {
                return <HeartIcon width={size} height={size} fill={color}/>
              }
            },
            tabBarInactiveTintColor: '#6D6D6D',
            tabBarStyle: {
              backgroundColor: "#F4F4F4",
            }
          })}
        >
          <Tab.Screen 
            name='HomeStack' 
            component={HomeStackScreen}
            options={() => ({
              title: "Home"
            })}
            initialParams={{
              favourites: favourites, // Passes the favourites array
              screen: 'Home'
            }}
          />
          <Tab.Screen 
            name='Favourites' 
            component={FavouritesScreen} 
            initialParams={{
              favourites: favourites,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}