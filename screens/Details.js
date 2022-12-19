import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BoxShadow } from 'expo-react-native-shadow';

import { headers } from '../apiHeaders';

// SVGs
import ProteinIcon from '../assets/images/icons/protein-icon.svg';
import CalorieIcon from '../assets/images/icons/calorie-icon.svg';

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
    const [dish, setDish] = useState([]);
    const { dishId, filters } = route.params;
    const { colors } = useTheme();

    const getDish = async () => {
        try {
            const res = await fetch(`https://lucifarian.be/wp-json/wp/v2/dishes/${dishId}`, {
                "method": "GET",
                "headers": headers,
            });
            const json = await res.json();
            setDish(json);
        } catch (err) {
            console.error(err);
        }
    }

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
        return null;
    };

    return (
        <ScrollView>
            <BoxShadow setting={shadowStyle}>
                <Image style={styles.heroImg} source={{uri: dish.image.guid}}/>
            </BoxShadow>
            <View style={styles.informationContainer}>
                <Text style={styles.h1}>{dish.title.rendered}</Text>
                <Text style={styles.paragraph}>{dish.description}</Text>
                <View style={styles.nutritionContainer}>
                    <View style={styles.nutritionItemContainer}>
                        <View style={[styles.nutritionIcon, { backgroundColor: colors.card}]}>
                            <CalorieIcon/>
                        </View>
                        <Text style={styles.paragraph}>{dish.calorie_count} Kcal</Text>
                    </View>

                    {dish.diets.map((item) => {
                        console.log(item);
                    })}

                    <View style={styles.nutritionItemContainer}>
                        <View style={[styles.nutritionIcon, { backgroundColor: colors.card}]}>
                            <ProteinIcon/>
                        </View>
                        <Text style={styles.paragraph}>{dish.protein_count}g Proteins</Text>
                    </View>
                </View>
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
        marginVertical: 20,
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
})

export default DetailScreen;