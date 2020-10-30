import React from 'react'
import { View, Text, StyleSheet, Button, Alert, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

export const EventScreen = ({navigation}: any) => {
    return (
        <View style={styles.container}>
            <MapView 
                style={styles.mapStyle}
                initialRegion={{
                    latitude: 50.903887,
                    longitude: 4.689936,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5
                }}
            >
                <Marker onPress={(e) => {e.stopPropagation(); navigation.navigate('Evenement')}} coordinate={{ latitude: 50.955333, longitude: 4.700123}} />
            </MapView>
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