import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Selector from '../components/Selector';

const IngrOrRecipe = props => {
    const [showIngrOrRecipe, setShowIngrOrRecipe] = useState('Ingredients');
    const { colors } = useTheme();

    return (
        <View>
            <View style={[styles.selectorsContainer, { backgroundColor: colors.card }]}>
                {props.options.map(item => (
                    <Selector 
                        name={item}
                        active={showIngrOrRecipe === item ? true : false}
                        onSelect={(name) => setShowIngrOrRecipe(name)}
                    />
                ))}
            </View>

            <View style={styles.listContainer}>
                {props.dish[showIngrOrRecipe.toLowerCase()].map((item, i) => (
                    <View key={i} style={styles.li}>
                        <Text style={styles.paragraph}>-</Text>
                        <Text style={[styles.paragraph, styles.listItem]}>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default IngrOrRecipe;

const styles = StyleSheet.create({
    paragraph: {
        fontFamily: "Inter-Regular",
        fontSize: 16,
    },
    selectorsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        borderRadius: 10,
        padding: 5,
    },
    listContainer: {
        marginTop: 20,
    },
    li: {
        flexDirection: "row",
        marginBottom: 10,
    },
    listItem: {
        marginLeft: 10,
    }
})