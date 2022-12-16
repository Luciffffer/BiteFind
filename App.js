import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Image } from 'react-native';

//screens
import DetailScreen from './screens/Details';
import HomeScreen from './screens/Home'; 

const Stack = createNativeStackNavigator();

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
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#F4F4F4",
          },
          headerTitleStyle: {
            fontWeight: "bold",
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
            headerRight: () => (
              <Image source={require('./assets/images/icons/search-icon.png')} />
            )
          }}
        />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}