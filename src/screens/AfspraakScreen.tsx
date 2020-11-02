import React from 'react'
import { View, Text, StyleSheet, Button, Alert, Dimensions } from 'react-native'
import { Provider as AfspraakProvider } from '../context/AfspraakContext'
import AddAfspraak from '../components/AddAfspraak'
import AfspraakList from '../components/AfspraakList'

export const EventScreen = ({navigation}: any) => {
    return (
        <View style={styles.container}>
            <AfspraakProvider>
                <AddAfspraak/>
                <AfspraakList/>
            </AfspraakProvider>
        </View>
    )
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
})