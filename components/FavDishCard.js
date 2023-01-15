import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from '@react-navigation/native';

import PreparationTime from "./PreparationTime";

import HeartIcon from '../assets/images/icons/menu-heart-icon.svg';

const FavDishCard = props => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <View style={styles.informationContainer}>
                <Text style={styles.title}>{props.name}</Text>
                <PreparationTime time={props.time} />
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: colors.darkCard }]} onPress={() => props.onSelectDish(props.id)}>
                        <Text style={styles.buttonText}>Read More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.onRemove(props.id)}>
                        <HeartIcon width='30' fill="red" />
                    </TouchableOpacity>
                </View>
            </View>
            <Image style={styles.image} source={{uri: props.imageUrl}} />
        </View>
    )
}

export default FavDishCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 20,
    },
    image: {
        width: "50%",
        aspectRatio: 1 / 0.8,
        borderRadius: 20,
    },
    informationContainer: {
        flex: 1,
        justifyContent: "space-between",
        padding: 10,
    },
    title: {
        fontFamily: "Kodchasan-Bold",
        fontSize: 16,
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    btn: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 4,
        marginTop: 10,
        marginRight: 10,
    },
    buttonText: {
        fontFamily: "Inter-Regular",
        color: "white",
        textAlign: "center"
    }
})