import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, FlatList, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

//components
import Filters from '../components/Filters';
import DishOfTheDay from '../components/DishOfTheDay';
import DishCard from '../components/DishCard';

//SVGs
import SearchIcon from '../assets/images/icons/search-icon.svg'

import { headers } from '../apiHeaders';

const HomeScreen = ({ navigation }) => {
    const [filters, setFilters] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [dishOfTheDay, setDishOfTheDay] = useState(null);
    const [activeFilters, setActiveFilters] = useState([]);
    
    const [displaySearch, setDisplaySearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { colors } = useTheme(); // gets the navigation theme colors to be used in styling.
    
    const filteredDishes = useMemo(() => {
        // WP REST api has no AND operator option when you do taxonomy filter requests so dishes/diets=3+4 returns all dishes with either diet 3 or diet 4
        // this is really stupid and since they removed the filter parameter i can't even bypass it with %2B instead of a +
        // wordpress just is the absolute worst
        // I thus have to make a manual check to see which dishes have certain diets myself. Thank you for listening to my rant (:        

        // Best solution i could find because app has multiple filters. It does cause a little lag. cuz u know for loops
        return dishes.filter(dish => (
            activeFilters.every(activeFilters => dish.diets.includes(activeFilters))
        ))
            
    }, [dishes, activeFilters])

    const getFilters = async () => { // Gets the filters from api
        try {
            const res = await fetch('https://lucifarian.be/wp-json/wp/v2/diets?orderby=id&order=asc', {
                "method": "GET",
                "headers": headers, 
            });
            const json = await res.json();
            setFilters(json);
        } catch (err) {
            console.error(err);
        }
    }

    const getDishes = async () => { // Gets dishes
        try {
            const res = await fetch('https://lucifarian.be/wp-json/wp/v2/dishes?orderby=id&order=asc', {
                "method": "GET",
                "headers": headers,
            });
            const json = await res.json();
            setDishes(json);

            const dotd = json.filter((item) => ( // If dish of the day. It'll set it to dish of the day
                item.is_dish_of_the_day === '1'
            ))
            setDishOfTheDay(dotd[0]);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getFilters();
        getDishes();

        navigation.setOptions({ // Makes Search icon clickable
            headerRight: () => (
                <TouchableOpacity onPress={() => setDisplaySearch(prev => !prev)} >
                    <SearchIcon/>
                </TouchableOpacity>
            )
        })
    }, [])

    const handleSearchChange = enteredText => {
        setSearchValue(enteredText);
    }

    const handleSearchSumbit = async () => { // Ye I know im repeating a lot of fetch code and i should probably make a basic fetch function that adapts to different scenarions but i dont have enough time
        try {
            const url = `https://lucifarian.be/wp-json/wp/v2/dishes?orderby=id&order=asc&search=${searchValue}`;
    
            const res = await fetch(url, {
                "method": "GET",
                "headers": headers,
            });
            const json = await res.json();
            setDishes(json);
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {displaySearch === true? <TextInput 
                onSubmitEditing={handleSearchSumbit}
                onChangeText={handleSearchChange}
                style={[styles.searchInput, { backgroundColor: colors.card, borderColor: colors.grey }]} 
                placeholder="search"
                value={searchValue}
            /> : null}

            <Filters setActiveFilters={setActiveFilters} filters={filters} activeFilters={activeFilters} />

            {dishOfTheDay !== null ? <DishOfTheDay 
                id={dishOfTheDay.id}
                name={dishOfTheDay.title.rendered} 
                heroImg={dishOfTheDay.image.guid} 
                onSelectDish={(selectedId) => { navigation.navigate('Details', { dishId: selectedId, filters: filters }) }}
            /> : null}

            <Text style={styles.title}>Dishes</Text>
            <FlatList //find a way to remove that damn error or another approach to doing this
                style={{ flex: 1 }} // makes it not scrollable. So error can be ignored
                numColumns={2}
                columnWrapperStyle={styles.dishContainer}
                data={filteredDishes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <DishCard 
                        id={item.id}
                        name={item.title.rendered} 
                        time={item.preparation_time} 
                        imageLink={item.image.guid} 
                        onSelectDish={(selectedId) => { navigation.navigate('Details', { dishId: selectedId, filters: filters }) }}
                    />
                )}
            />
            <StatusBar/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "flex-start",
    },
    title: {
        fontFamily: "Kodchasan-Bold",
        fontSize: 20,
        alignSelf: "flex-start",
        marginHorizontal: 15,
        marginVertical: 10,        
    },
    dishContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        justifyContent: "space-between",
    },
    searchInput: {
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontSize: 16,
        fontFamily: "Inter-Regular",
        marginBottom: 10,
        borderBottomWidth: 1,
    }
})

export default HomeScreen;