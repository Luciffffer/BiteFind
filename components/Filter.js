import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

//SVGs
import DairyFreeSymbol from '../assets/images/icons/dairy-free-symbol.svg';
import VegetarianSymbol from '../assets/images/icons/vegetarian-symbol.svg';
import VeganSymbol from '../assets/images/icons/vegan-symbol.svg';
import GlutenFreeSymbol from '../assets/images/icons/gluten-free-symbol.svg';

const Filter = props => {
    const { colors } = useTheme();
    const filterMargin = props.isLast === true ? null : { marginRight: 10 };
    const [isActive, setIsActive] = useState(false);

    // really messy code should find a better way
    const chooseSymbol = (id) => {
        switch (id) {
            case 4:
                return <DairyFreeSymbol width="20" height="20" />
                break;
            case 5:
                return <VegetarianSymbol width="20" height="20" />
                break;
            case 6:
                return <GlutenFreeSymbol width="20" height="20" />
                break;
            case 3:
                return <VeganSymbol width="20" height="20" />
                break;
        }
    }

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
            {chooseSymbol(props.id)}
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