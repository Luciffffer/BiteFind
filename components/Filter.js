import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const Filter = props => {
    return (
        <TouchableOpacity style={styles.filter}>
            <Image style={{width: 20, height: 20, marginRight: 10}} source={props.imagePath} />
            <Text style={styles.paragraph}>{props.name}</Text>
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
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
    },
})

export default Filter;