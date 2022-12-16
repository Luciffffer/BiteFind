import React, { useState, useEffect, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Image, View, Text } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

//screens
import DetailScreen from './screens/Details';
import HomeScreen from './screens/Home'; 

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

//custom fonts
const customFonts = {
  'Kodchasan-Bold': require('./assets/fonts/Kodchasan-Bold.ttf')
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
  },
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(customFonts);
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
              fontWeight: "bold",
              fontSize: 24,
              fontFamily: "Kodchasan-Bold",
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
              headerRight: () => (
                <Image source={require('./assets/images/icons/search-icon.png')} />
              )
            }}
          />
          <Stack.Screen name="Details" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}