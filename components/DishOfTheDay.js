import { StyleSheet, Text, Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

//had to manually fix this module. If reinstall it won't work.
//changed "import { Svg } from 'expo'; const { Rect, Defs, LinearGradient, Stop, } = Svg;"
//to "import Svg, { Rect, Defs, LinearGradient, Stop, RadialGradient, Path } from 'react-native-svg';"
//dependency: react-native-svg
import { BoxShadow } from 'expo-react-native-shadow'; 

//to do: implement image shadow and clean up

const shadowStyle = {
    width: Dimensions.get('window').width - 30,
    height: (Dimensions.get('window').width - 30) / 2 / 120 * 100,
    color: "#172117",
    border: 4,
    radius: 20,
    opacity: 0.25,
    x: 0,
    y: 3,
}

const imageShadowStyle = {
    width: (Dimensions.get('window').width - 30) / 2,
    height: (Dimensions.get('window').width - 30) / 2 / 120 * 100,
    color: "#172117",
    border: 4,
    radius: 20,
    opacity: 0.25,
    x: -3,
    y: 0,
}

const DishOfTheDay = props => {
    const { colors } = useTheme(); //uses the custom theme that i set up in app.js

    return (
        <View style={styles.dotdParentContainer}>
            <BoxShadow setting={shadowStyle}>
                <TouchableOpacity onPress={() => props.onSelectDish(props.id)}>
                    <View style={[styles.dotdContainer, { backgroundColor: colors.primary }]}>
                        <View style={styles.dotdLeftContainer}>
                            <Text style={[styles.dotdTopLeft, { color: colors.card }]}>Dish of the day</Text>
                            <Text style={[styles.dotdH2, { color: colors.card }]}>{props.name}</Text>
                            <View style={[styles.btn, { backgroundColor: colors.darkCard }]}>
                                <Text style={{ color: colors.background, fontSize: 16, fontFamily: "Inter-Regular" }}>Read More</Text>
                            </View>
                        </View>
                        <BoxShadow setting={imageShadowStyle}><Image style={styles.heroImg} source={{uri: props.heroImg}}/></BoxShadow>
                    </View>
                </TouchableOpacity>
            </BoxShadow>
        </View>
    )
}

const styles = StyleSheet.create({
    dotdParentContainer: {
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    dotdContainer: {
        flexDirection: "row",
        width: "100%",
        borderRadius: 20,
    },
    heroImg: {
        flex: 1,
        borderRadius: 20,
        aspectRatio: 1.2/1,
    },
    dotdLeftContainer: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        position: "relative",
    },
    dotdH2: {
        fontFamily: "Kodchasan-Bold",
        fontSize: 20,
        marginBottom: 5,
    },
    dotdTopLeft: {
        position: "absolute",
        top: 10,
        left: 10,
        fontSize: 16,
        fontFamily: "Inter-Light",
    },
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 3,
        alignSelf: "flex-start",
        borderRadius: 10,
    }
})

export default DishOfTheDay;