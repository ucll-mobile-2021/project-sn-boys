import React from 'react'
import { View, Text, StyleSheet, Button, Alert, ImageBackground } from 'react-native'
import { BlurView} from  'react-native-blur'
import { color, greaterOrEq } from 'react-native-reanimated';

export const LandingScreen = ({navigation}:any) => {
    return (
        <View style={styles.maincontainer}>
            <ImageBackground source="https://www.evenementorganiseren.nl/public/image/artikelen/2016/20180802-messe_luzern_corporate_event.jpg" style={styles.image} blurRadius={6}>
                    <View style={styles.nestedContainer}>
                        <Text style={styles.title}>Find an event in your area</Text>
                        <Button onPress={() => navigation.navigate('Evenementen', {name: 'Roel'})} title="Login with Facebook"></Button>
                    </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        flexDirection: "column",
    },
    nestedContainer: {
        height: 1000,
        flex: 1,
        justifyContent: "space-evenly",
        flexDirection: "column",
        alignItems: "center",

    },
    title: {
        fontSize: 75,
        color: "white",
        textAlign: "center",
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: 4, height: 1},
        textShadowRadius: 1,
    },
    image: {
        flex: 1,
        flexDirection: "column",
        resizeMode: "stretch",
        justifyContent: "center",
    },
    text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold"
    }

})