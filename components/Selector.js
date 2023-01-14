import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Selector = props => {
    const { colors } = useTheme();

    return (
        <TouchableHighlight onPress={() => props.onSelect(props.name)} style={[styles.selectorItem, props.active ? { backgroundColor: colors.darkCard } : null]}>
            <Text style={[styles.selectorText, props.active ? { color: 'white' } : null]}>{props.name}</Text>
        </TouchableHighlight>
    )

}

export default Selector;

const styles = StyleSheet.create({
    selectorItem: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
    },
    selectorText: {
        fontFamily: "Inter-Regular",
        fontSize: 16,
        textAlign: "center",
    },
});