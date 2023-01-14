import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

import DietSymbol from './DietSymbol';

const Filter = props => {
    const { colors } = useTheme();
    const filterMargin = props.isLast === true ? null : { marginRight: 10 };
    const [isActive, setIsActive] = useState(false);    

    const handleFilterPress = () => {
        setIsActive((prev) => !prev);
        props.onFilterPress(props.id, !isActive);
    }

    return (
        <TouchableOpacity style={[
            styles.filter, 
            filterMargin, 
            isActive === true ? { backgroundColor: colors.darkCard } : null
        ]} onPress={handleFilterPress}>
            <DietSymbol id={props.id} height="20"/>
            <Text style={[
                styles.filterText, 
                isActive === true ? { color: colors.background } : null
            ]}>{props.name}</Text>
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
    },
    filterText: {
        fontFamily: "Inter-Light",
        fontSize: 16,
        marginLeft: 10,
    }
})

export default Filter;