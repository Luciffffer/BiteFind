import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableHighlight, TouchableOpacity, AppRegistry } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BoxShadow } from 'expo-react-native-shadow';

import { headers } from '../apiHeaders';
import LoadComponent from '../components/LoadComponent';
import IngrOrRecipe from '../components/IngrOrRecipe';
import DietSymbol from '../components/DietSymbol';

// SVGs
import ProteinIcon from '../assets/images/icons/protein-icon.svg';
import CalorieIcon from '../assets/images/icons/calorie-icon.svg';
import HeartIcon from '../assets/images/icons/heart-icon.svg';
import MenuHeartIcon from '../assets/images/icons/menu-heart-icon.svg';

const shadowStyle = {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width) / 130 * 100,
    color: "#172117",
    border: 4,
    radius: 20,
    opacity: 0.25,
    x: 0,
    y: 4,
}

const DetailScreen = ({ navigation, route }) => {
    const [screenIsReady, setScreenIsReady] = useState(false);
    const [dish, setDish] = useState(null);
    const [favourite, setFavourite] = useState(false);
    const { dishId, filters } = route.params;
    const { colors } = useTheme();

    const filteredFilters = useMemo(() => { // not entirely happy with this
        if (dish !== null) {
            return filters.filter(filter => dish.diets.includes(filter.id));
        } else {
            return null;
        }
    }, [dish])

    const getDish = async () => {
        try {
            const res = await fetch(`https://lucifarian.be/wp-json/wp/v2/dishes/${dishId}`, {
                "method": "GET",
                "headers": headers,
            });
            const json = await res.json();
            setDish(json);

            if (route.params.favourites.includes(json.id)) {
                setFavourite(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleFavouritePress = () => {
        if (!favourite) {
            route.params.favourites.push(dish.id);
        } else if (favourite) {
            route.params.favourites.splice(route.params.favourites.indexOf(dish.id), 1);
        }

        setFavourite((prev) => !prev);
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                if (!favourite) {
                    return (
                        <TouchableOpacity onPress={handleFavouritePress}>
                            <HeartIcon width="30" height="30" />
                        </TouchableOpacity>
                    )
                } else if (favourite) {
                    return (
                        <TouchableOpacity onPress={handleFavouritePress}>
                            <MenuHeartIcon width="30" height="30" fill="red"/>
                        </TouchableOpacity>
                    )
                }
            }
        });
    }, [dish, favourite])

    useEffect(() => {
        const prepare = async () => {
            try {
                await getDish();
            } catch (err) {
                console.error(err);
            } finally {
                setScreenIsReady(true);
            }
        }

        prepare();
    }, [])

    if (!screenIsReady) {
        return <LoadComponent/>; //The Loadscreen doesn't actually match the load progress. It's just a lil thing to better the user experience.
    };

    return (
        <ScrollView>
            <BoxShadow setting={shadowStyle}>
                <Image style={styles.heroImg} source={{uri: dish.image.guid}}/>
            </BoxShadow>
            <View style={styles.informationContainer}>
                <Text style={styles.h1}>{dish.title.rendered}</Text>
                <Text style={styles.paragraph}>{dish.description}</Text>

                <View style={styles.dietsContainer}>
                    {filteredFilters.map((item, i) => (
                        <View key={i} style={styles.dietContainer}>
                            <DietSymbol id={item.id} height="30" />
                            <Text style={[styles.paragraph, { marginLeft: 10 }]}>{item.name}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.nutritionContainer}>
                    <View style={styles.nutritionItemContainer}>
                        <View style={[styles.nutritionIcon, { backgroundColor: colors.card}]}>
                            <CalorieIcon/>
                        </View>
                        <Text style={styles.paragraph}>{dish.calorie_count} Kcal</Text>
                    </View>

                    <View style={styles.nutritionItemContainer}>
                        <View style={[styles.nutritionIcon, { backgroundColor: colors.card}]}>
                            <ProteinIcon/>
                        </View>
                        <Text style={styles.paragraph}>{dish.protein_count}g Proteins</Text>
                    </View>
                </View>

                <IngrOrRecipe
                    dish={dish}
                    options={['Ingredients', 'Recipe']}
                />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    heroImg: {
        width: "100%",
        aspectRatio: 1.3/1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    h1: {
        fontFamily: "Kodchasan-Bold",
        fontSize: 24,
        marginVertical: 10,
    },
    informationContainer: {
        padding: 15,
    },
    paragraph: {
        fontFamily: "Inter-Regular",
        fontSize: 16,
    },
    nutritionContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    nutritionIcon: {
        padding: 10,
        alignSelf: "flex-start",
        borderRadius: 10,
        marginRight: 20,
    },
    nutritionItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "45%",
    },
    dietContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    dietsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginVertical: 20,
    }
})

export default DetailScreen;