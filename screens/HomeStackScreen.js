import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import DetailScreen from '../screens/Details';
import HomeScreen from '../screens/Home'; 

//SVG icons (uses react-native-svg-transformer to convert)
import SearchIcon from '../assets/images/icons/search-icon.svg';
import MenuHeartIcon from '../assets/images/icons/menu-heart-icon.svg';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = ({navigation, route}) => {
    return (
        <HomeStack.Navigator
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
          initialRouteName="Home"
        >
          <HomeStack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ 
              title: "BiteFind",
              headerRight: () => <SearchIcon/>
            }}
          />
          <HomeStack.Screen 
            name="Details" 
            component={DetailScreen} 
            initialParams={route.params}
            options={{
              headerRight: () => <MenuHeartIcon width="30" height="30" fill="#6D6D6D"/>,
              title: "Dish"
            }}
          />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen;