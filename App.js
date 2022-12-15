import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//screens
import DetailScreen from './screens/Details';
import HomeScreen from './screens/Home'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "F4F4F4",
        }
      }}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{title: "BiteFind"}}
        />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}