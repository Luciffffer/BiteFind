import React, { useState, useEffect, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

//screens
import DetailScreen from './screens/Details';
import HomeScreen from './screens/Home'; 

//SVG icons (uses react-native-svg-transformer to convert)
import SearchIcon from './assets/images/icons/search-icon.svg';
import HeartIcon from './assets/images/icons/heart-icon.svg';

import { getHeaders } from './apiHeaders';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

//custom fonts
const customFonts = {
  'Kodchasan-Bold': require('./assets/fonts/Kodchasan-Bold.ttf'),
  'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
  'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
}

//custom navigation theme
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

  useEffect(() => {
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

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer theme={MyTheme} >
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#F4F4F4",
            },
            headerTitleStyle: {
              fontFamily: "Kodchasan-Bold",
              fontSize: 24,
            },
            headerShadowVisible: false,
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: "BiteFind",
              headerRight: () => <SearchIcon/>
            }}
          />
          <Stack.Screen 
            name="Details" 
            component={DetailScreen} 
            options={{
              headerRight: () => <HeartIcon/>,
              title: "Dish"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}