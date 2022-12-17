import { StyleSheet, Text, Image, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';

//had to manually fix this module. If reinstall it won't work.
//changed "import { Svg } from 'expo'; const { Rect, Defs, LinearGradient, Stop, } = Svg;
//to "import Svg, { Rect, Defs, LinearGradient, Stop, RadialGradient, Path } from 'react-native-svg';"
//dependency: react-native-svg
import { BoxShadow } from 'expo-react-native-shadow'; 

//to do: implement image shadow

const shadowStyle = {
    width: Dimensions.get('window').width - 30,
    height: 150,
    color: "#172117",
    border: 4,
    radius: 20,
    opacity: 0.2,
    x: 0,
    y: 4,
  }

const DishOfTheDay = props => {
    const { colors } = useTheme(); //uses the custom theme that i set up in app.js

    return (
        <View style={styles.dotdParentContainer}>
            <BoxShadow setting={shadowStyle}>
                <TouchableWithoutFeedback>
                    <View style={[styles.dotdContainer, { backgroundColor: colors.primary }]}>
                        <View style={styles.dotdLeftContainer}>
                            <Text style={[styles.dotdTopLeft, { color: colors.card }]}>Dish of the day</Text>
                            <Text style={[styles.dotdH2, { color: colors.card }]}>{props.name}</Text>
                            <View style={[styles.btn, { backgroundColor: colors.darkCard }]}>
                                <Text style={{ color: colors.background, fontSize: 16, fontFamily: "Inter-Regular" }}>Read More</Text>
                            </View>
                        </View>
                        <Image style={styles.heroImg} source={props.heroImg}/>
                    </View>
                </TouchableWithoutFeedback>
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
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 7,
        fontFamily: "Kodchasan-Bold",
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