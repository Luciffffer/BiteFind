import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return(
        <View style={{backgroundColor: "F4F4F4", flex: 1}}>
            <Text>Hello World!!</Text>
            <StatusBar/>
        </View>
    )
};

export default HomeScreen;