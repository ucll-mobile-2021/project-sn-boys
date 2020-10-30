import React from 'react'
import { View, Text, StyleSheet, Button, Alert,  } from 'react-native'


export const TestScreen = ({navigation}: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Evenement</Text>
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