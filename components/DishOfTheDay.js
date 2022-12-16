import { StyleSheet, Text, Image, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const DishOfTheDay = props => {
    const { colors } = useTheme(); //uses the custom theme that i set up in app.js

    return (
        <View style={styles.dotdParentContainer}>
            <TouchableWithoutFeedback>
                <View style={[styles.dotdContainer, { backgroundColor: colors.primary }]}>
                    <View style={styles.dotdLeftContainer}>
                        <Text style={[styles.dotdTopLeft, { color: colors.card }]}>Dish of the day</Text>
                        <Text style={[styles.dotdH2, { color: colors.card }]}>{props.name}</Text>
                        <Text style={[styles.btn, { color: colors.card, backgroundColor: colors.darkCard }]}>Read More</Text>
                    </View>
                    <Image style={styles.heroImg} source={props.heroImg}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    dotdParentContainer: {
        width: "100%",
        paddingHorizontal: 15,
    },
    dotdContainer: {
        flexDirection: "row",
        width: "100%",
        borderRadius: 20,
        height: 150,
    },
    heroImg: {
        flex: 1,
        borderRadius: 20,
        height: "100%",
    },
    dotdLeftContainer: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        position: "relative",
    },
    dotdH2: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 7,
    },
    dotdTopLeft: {
        position: "absolute",
        top: 10,
        left: 10,
        fontSize: 16,
    },
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 3,
        fontSize: 16,
        alignSelf: "flex-start",
        borderRadius: 10,
    }
})

export default DishOfTheDay;