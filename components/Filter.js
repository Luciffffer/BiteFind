import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const Filter = props => {
    return (
        <TouchableOpacity style={styles.filter}>
            <Image style={{width: 20, height: 20, marginRight: 10}} source={props.imagePath} />
            <Text style={styles.filterText}>{props.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    filter: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 100,
        paddingHorizontal: 15,
        paddingVertical: 3,
        marginRight: 10,
    },
    filterText: {
        fontSize: 16,
        fontFamily: "Inter-Light",
    }
})

export default Filter;