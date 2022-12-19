import { useState, useEffect } from 'react';
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
    
    const getFilters = async () => {
        try {
            const res = await fetch('https://lucifarian.be/wp-json/wp/v2/diets', {
                "method": "GET",
                "headers": headers, 
            });
            const json = await res.json();
            json.sort((a, b) => a.id - b.id);
            setFilters(json);
        } catch (err) {
            console.error(err);
        }
    }

    const getDishes = async () => {
        try {
            const res = await fetch('https://lucifarian.be/wp-json/wp/v2/dishes', {
                "method": "GET",
                "headers": headers,
            });
            const json = await res.json();
            json.sort((a, b) => a.id - b.id);
            setDishes(json);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getFilters();
        getDishes();
    }, [])

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
                {filters.map((filter, i) => {
                    let last = false;
                    i + 1 === filters.length ? last = true : last;
                    return <FilterItem key={filter.id} id={filter.id} name={filter.name} isLast={last}/>  
                })}
            </ScrollView>
            <DishOfTheDay name="Pasta Pesto" heroImg={require('../assets/images/pesto.png')}/>
            <Text style={styles.title}>Dishes</Text>
            <FlatList //find a way to remove that damn error or another approach to doing this
                style={{ flex: 1 }} // makes it not scrollable
                numColumns={2}
                columnWrapperStyle={styles.dishContainer}
                data={dishes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <DishCard name={item.title.rendered} time={item.preparation_time} imageLink={item.image.guid} />
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