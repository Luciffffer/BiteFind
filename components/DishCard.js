import { StyleSheet, TouchableOpacity, Text, Image, View, Dimensions } from "react-native";
import { useTheme } from '@react-navigation/native';
import { BoxShadow } from 'expo-react-native-shadow';

//SVGs
import TimeIcon from '../assets/images/icons/time-icon.svg'

const shadowStyle = {
    width: (Dimensions.get('window').width - 45) / 2,
    height: 300,
    color: "#172117",
    border: 4,
    radius: 10,
    opacity: 0.2,
    x: 0,
    y: 4,
}

const imageShadowStyle = {
    width: (Dimensions.get('window').width - 45) / 2,
    height: (Dimensions.get('window').width - 45) / 2 / 100 * 90,
    color: "#172117",
    border: 4,
    radius: 10,
    opacity: 0.2,
    x: 0,
    y: 3,
}

const DishCard = props => {
    const { colors } = useTheme();

    return (
        // <BoxShadow setting={shadowStyle}>
            <TouchableOpacity 
                style={[styles.dishContainer, { backgroundColor: colors.card }]}
                onPress={() => props.onSelectDish(props.id)}
            >
                <BoxShadow setting={imageShadowStyle}><Image style={styles.image} source={{uri: props.imageLink}} /></BoxShadow>
                <View style={styles.dishTextContainer}>
                    <View>
                        <Text style={styles.dishTitle} >{props.name}</Text>
                        <View style={styles.timeContainer}>
                            <TimeIcon/>
                            <Text style={[styles.time, { color: colors.grey }]}>{props.time} min</Text>
                        </View>
                    </View>
                    <View style={[styles.btn, { backgroundColor: colors.darkCard }]}>
                        <Text style={{ fontFamily: "Inter-Regular", color: colors.background, fontSize: 16, alignSelf: "center" }}>Read More</Text>
                    </View>
                </View>
            </TouchableOpacity>       
        // </BoxShadow>
    )
}

export default DishCard;

const styles = StyleSheet.create({
    dishContainer: {
        flexBasis: (Dimensions.get('window').width - 45) / 2,
        borderRadius: 10,
        marginBottom: 20,
    },
    image: {
        width: "100%",
        aspectRatio: 1/0.9,
        borderRadius: 10,
    },
    dishTitle: {
        fontFamily: "Kodchasan-Bold",
        fontSize: 16,
        marginBottom: 5,
    },
    dishTextContainer: {
        padding: 10,
        justifyContent: "space-between",
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    time: {
        fontFamily: "Inter-Light",
        fontSize: 16,
        marginLeft: 10,
    },
    btn: {
        width: "100%",
        borderRadius: 10,
        paddingVertical: 4,
        marginTop: 10,
    }
})