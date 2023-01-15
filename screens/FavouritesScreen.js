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

    useEffect(() => {
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