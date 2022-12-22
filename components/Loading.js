import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useTheme } from '@react-navigation/native';

const LoadComponent = () => {
    const { colors } = useTheme();
    const fadeInAnimation = useRef(new Animated.Value(-300)).current;

    useEffect(() => {
        Animated.timing(
          fadeInAnimation,
          {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }
        ).start();
    }, [fadeInAnimation])

    return (
        <View style={styles.container}>
            <View style={styles.bar}>
                <View style={[styles.barBackground, { backgroundColor: colors.grey }]}></View>
                <Animated.View style={[
                    styles.barForegroud, 
                    { backgroundColor: colors.primary, transform: [{ translateX: fadeInAnimation}] }]}
                >
                </Animated.View>
            </View>
            <Text style={styles.loadText}>Loading</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadText: {
        fontFamily: "Kodchasan-Bold",
        fontSize: 30,
        marginBottom: 100,
    },
    icon: {
        aspectRatio: 1/1,
        height: 150,
    },
    barBackground: {
        width: 300,
        height: 10,
        borderRadius: 200,
        position: "absolute",
        zIndex: 0,
    },
    barForegroud: {
        height: 10,
        width: 300,
        borderRadius: 200,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
    },
    bar: {
        width: 300,
        height: 10,
        overflow: "hidden",
        position: "relative",
    }
})

export default LoadComponent