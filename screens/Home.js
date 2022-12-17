import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

//components
import FilterItem from '../components/Filter';
import DishOfTheDay from '../components/DishOfTheDay';
import DishCard from '../components/DishCard';

import headers from '../apiHeaders';

const HomeScreen = ({ navigation }) => {
    const [filters, setFilters] = useState([]);
    
    const getFilters = async () => {
        try {
            const res = await fetch('https://lucifarian.be/wp-json/wp/v2/diets', {
                "method": "GET",
                "headers": headers, 
            });
            const json = await res.json();
            setFilters(json);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getFilters();
    }, [])

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <ScrollView 
                style={styles.filterRow} 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ //styling of child container of the scrollview component
                    paddingHorizontal: 15,
                }}
            >
                {/* Find a solution for the gaps. when api is implemented and .map is used maybe pass in a is last element check and remove margin */}
                {filters.map((filter) => (<FilterItem key={filter.id} id={filter.id} name={filter.name} />))}
            </ScrollView>
            <DishOfTheDay name="Pasta Pesto" heroImg={require('../assets/images/pesto.png')}/>
            <Text style={styles.title}>Dishes</Text>
            <View style={styles.dishContainer}>
                <DishCard/>
                <DishCard/>
                <DishCard/>
                <DishCard/>
                <DishCard/>
                <DishCard/>
                <DishCard/>
            </View>
            <StatusBar/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    filterRow: {
        width: "100%",
        marginVertical: 10,
        flexGrow: 0,
    },
    title: {
        fontFamily: "Kodchasan-Bold",
        fontSize: 20,
        alignSelf: "flex-start",
        marginHorizontal: 15,
        marginVertical: 10,        
    },
    dishContainer: {
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    }
})

export default HomeScreen;