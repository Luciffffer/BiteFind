import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

import { headers } from '../apiHeaders';
import FavDishCard from "../components/FavDishCard";

const FavouritesScreen = ({navigation, route}) => {
    const [theFavourites, setTheFavourites] = useState([]);
    const [favouriteDishes, setFavouriteDishes] = useState([]);
    
    const updateTheFavourites = () => {
        setTheFavourites([...route.params.favourites]);
    }

    useEffect(() => {
        const updateFavourites = navigation.addListener('focus', updateTheFavourites)

        return updateFavourites;
    }, [navigation])

    useEffect(() => { // Gets dishes with favourites id's
        if (theFavourites.length !== 0) {
            let url = 'https://lucifarian.be/wp-json/wp/v2/dishes?orderby=id&order=asc';

            theFavourites.forEach(id => {
                url = url + `&include[]=${id}`;
            });

            fetch(url, { "method": "GET", "headers": headers })
                .then(res => res.json())
                .then(json => setFavouriteDishes(json))
                .catch(err => console.error(err))
        } else {
            setFavouriteDishes([]);
        }
    }, [theFavourites])

    const onRemove = (id) => {
        route.params.favourites.splice(route.params.favourites.indexOf(id), 1);
        updateTheFavourites();
    }

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Favourites</Text>
            </View>
            <FlatList
                contentContainerStyle={{
                    height: "100%"
                }}
                data={favouriteDishes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <FavDishCard 
                        id={item.id}
                        name={item.title.rendered}
                        time={item.preparation_time}
                        imageUrl={item.image.guid}
                        onRemove={id => onRemove(id)}
                        onSelectDish={(selectedId) => { navigation.navigate('HomeStack', { screen: 'Details', initial: false, dishId: selectedId }) }}
                        // I am aware of the bug that when onSelectDish executes the initial homestack screen changes to that details screen permanently
                        // I however have not found a way to fix this in time. I tried following the react navigation docs on how to not set it to initial, but this did not work.
                    />
                )}
            />
        </View>
    )
}

export default FavouritesScreen;

const styles = StyleSheet.create({
    header: {
        justifyContent: "flex-end",
        alignItems: "center",
        height: 85,
    },
    headerText: {
        fontFamily: "Kodchasan-Bold",
        fontSize: 24,
        marginBottom: 5,
    }
})