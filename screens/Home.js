import { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, FlatList, Dimensions } from 'react-native';

//components
import FilterItem from '../components/Filter';
import DishOfTheDay from '../components/DishOfTheDay';
import DishCard from '../components/DishCard';

import { headers } from '../apiHeaders';

const HomeScreen = ({ navigation }) => {
    const [filters, setFilters] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [dishOfTheDay, setDishOfTheDay] = useState(null);
    const [activeFilters, setActiveFilters] = useState([]);
    
    const filteredDishes = useMemo(() => {
        // WP REST api has no AND operator option when you do taxonomy filter requests so dishes/diets=3+4 returns all dishes with either diet 3 or diet 4
        // this is really stupid and since they removed the filter parameter i can't even bypass it with %2B instead of a +
        // wordpress just is the absolute worst
        // I thus have to make a check to see which dishes have certain diets myself. Thank you for listening to my rant (:        

        // Best solution i could find because app has multiple filters. It does cause lag. cuz u know for loops
        return dishes.filter(dish => (
            activeFilters.every(activeFilters => dish.diets.includes(activeFilters))
        ))
            
    }, [dishes, activeFilters])

    const getFilters = async () => {
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

    const getDishes = async () => {
        try {
            const res = await fetch('https://lucifarian.be/wp-json/wp/v2/dishes?orderby=id&order=asc', {
                "method": "GET",
                "headers": headers,
            });
            const json = await res.json();
            setDishes(json);

            const dotd = json.filter((item) => (
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
    }, [])

    const onFilterPress = (id, active) => {
        if (active) {
            setActiveFilters((prev) => [...prev, id]);
        } else if (!active) {
            let newArray = [...activeFilters];
            newArray.splice(newArray.indexOf(id), 1)
            setActiveFilters([...newArray]); 
        }
    }

    return(
        // <FlatList
        //     data={dishes}
        //     keyExtractor={item => item.id}
        //     renderItem={({ item }) => (
        //         <DishCard name={item.title.rendered} time={item.preparation_time} imageLink={item.image.guid} />
        //     )}
        //     ListHeaderComponent={
        //         <View>
        //             <ScrollView 
        //             style={styles.filterRow} 
        //             horizontal 
        //             showsHorizontalScrollIndicator={false}
        //             contentContainerStyle={{ //styling of child container of the scrollview component
        //                 paddingHorizontal: 15,
        //             }}
        //         >
        //             {filters.map((filter, i) => {
        //                 let last = false;
        //                 i + 1 === filters.length ? last = true : last;
        //                 return <FilterItem key={filter.id} id={filter.id} name={filter.name} isLast={last}/>  
        //             })}
        //         </ScrollView>
        //         </View>
        //         <DishOfTheDay name="Pasta Pesto" heroImg={require('../assets/images/pesto.png')}/>
        //     }
        // >

        //</FlatList>

        <ScrollView contentContainerStyle={styles.container}>
            <ScrollView 
                style={styles.filterRow} 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ //styling of child container of the scrollview component
                    paddingHorizontal: 15,
                }}
            >
                {filters.map((filter, i) => (
                    <FilterItem 
                        key={filter.id} 
                        id={filter.id} 
                        name={filter.name} 
                        isLast={i + 1 === filters.length ? true : false}
                        onFilterPress={onFilterPress}
                    />  
                ))}
            </ScrollView>
            {dishOfTheDay !== null ? <DishOfTheDay 
                id={dishOfTheDay.id}
                name={dishOfTheDay.title.rendered} 
                heroImg={dishOfTheDay.image.guid} 
                onSelectDish={(selectedId) => { navigation.navigate('Details', { dishId: selectedId, filters: filters }) }}
            /> : null}
            <Text style={styles.title}>Dishes</Text>
            <FlatList //find a way to remove that damn error or another approach to doing this
                style={{ flex: 1 }} // makes it not scrollable
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
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        justifyContent: "space-between",
    }
})

export default HomeScreen;