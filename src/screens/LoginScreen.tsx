import React from 'react'
import { View, Text, StyleSheet, Button, Alert,  } from 'react-native'
import { EventScreen } from './EventScreen'
import { StackScreenProps } from '@react-navigation/stack';
import { NavigationProp } from '@react-navigation/native';

export const LandingScreen = ({navigation}: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welkom</Text>
            <Button onPress={() => navigation.navigate('Evenementen', {name: 'Roel'})} title="Fake login button"></Button>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 75
    }

})