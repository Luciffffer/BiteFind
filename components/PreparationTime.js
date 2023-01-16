import { Text, View, StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';

import TimeIcon from '../assets/images/icons/time-icon.svg';

// Just displays the symbol with the text. This same code was used in 2 places, so it's better to just put it in a component

const PreparationTime = props => {
    const { colors } = useTheme();

    return (
        <View style={styles.timeContainer}>
            <TimeIcon/>
            <Text style={[styles.time, { color: colors.grey }]}>{props.time} min</Text>
        </View>
    )
}

export default PreparationTime;

const styles = StyleSheet.create({
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    time: {
        fontFamily: "Inter-Light",
        fontSize: 16,
        marginLeft: 10,
    },
})

