import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

//components
import Filter from '../components/Filter';
import DishOfTheDay from '../components/DishOfTheDay';

const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <ScrollView style={styles.filterRow} horizontal showsHorizontalScrollIndicator={false}>
                <Filter name="Vegan" imagePath={require('../assets/images/icons/vegan-symbol.png')}/>
                <Filter name="Dairy-free" imagePath={require('../assets/images/icons/vegan-symbol.png')}/>
                <Filter name="Gluten-free" imagePath={require('../assets/images/icons/vegan-symbol.png')}/>
                <Filter name="Vegetarian" imagePath={require('../assets/images/icons/vegan-symbol.png')}/>
            </ScrollView>
            <DishOfTheDay name="Pasta Pesto" heroImg={require('../assets/images/pesto.png')}/>
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
        marginVertical: 20,
        flexGrow: 0,
    },
    paragraph: {
        fontSize: 16,
    },
})

export default HomeScreen;