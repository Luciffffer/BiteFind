import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';

//components
import Filter from '../components/Filter';

const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <View style={{height: 30, marginVertical: 20}}>
                <ScrollView style={styles.filterRow} horizontal>
                    <Filter name="Vegan" imagePath={require('../assets/images/icons/vegan-symbol.png')}/>
                    <Filter name="Vegan" imagePath={require('../assets/images/icons/vegan-symbol.png')}/>
                    <Filter name="Vegan" imagePath={require('../assets/images/icons/vegan-symbol.png')}/>
                    <Filter name="Vegan" imagePath={require('../assets/images/icons/vegan-symbol.png')}/>
                    <Filter name="Vegan" imagePath={require('../assets/images/icons/vegan-symbol.png')}/>
                </ScrollView>
            </View>
            <View>
                <View>
                    <Text>Dish of the day</Text>
                    <Text>Pasta Pesto</Text>
                </View>
                <Image source={require('../assets/images/pesto.png')}/>
            </View>
            <Text>Hello World!!</Text>
            <StatusBar/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    filterRow: {
        width: "100%",
        paddingHorizontal: 15,
    },
    paragraph: {
        fontSize: 16,
    }
})

export default HomeScreen;