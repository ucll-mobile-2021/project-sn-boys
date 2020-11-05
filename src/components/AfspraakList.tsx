import React, { useContext } from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import { Context as AfspraakContext } from '../context/AfspraakContext'
import { deleteAfspraak, updateAfspraak } from '../actions/AfspraakActions'
import { ToolbarAndroidBase } from 'react-native'
import { FlatList, State } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export const AfspraakList: React.FC = () => {
    const navigation = useNavigation();

    const {
        state: {afspraken},
        dispatch
    } = useContext(AfspraakContext)

    const deleteHandler = (id: string) => dispatch(deleteAfspraak(id)) 

    return afspraken.length > 0 ? (
        <View>
        <FlatList 
            data={afspraken} 
            keyExtractor={item => item.id} 
            renderItem={({item}) => 
                <View style={styles.TaskContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>{item.description}</Text>

                    <View style={styles.buttonGroup}>
                        <Button title="Delete" onPress={() => deleteHandler(item.id)}></Button>
                        <Button title="Update" onPress={() => navigation.navigate('updateAfspraak', {id: item.id})}></Button>
                    </View>
                </View>
                }>
        </FlatList>
        </View>
    ) : (
        <View style={styles.nothingFoundContainer}>
            <Text style={styles.title}>Geen afspraken gevonden</Text>
        </View>
    )

}


const styles = StyleSheet.create({

    nothingFoundContainer: {
        marginTop: 25,
        alignItems: "center",
        display: "flex",
        textAlign:"left",
    },
    TaskContainer: {
        marginTop: 20,
        marginBottom: 25,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginHorizontal: 20
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },

    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 135,
        marginTop: 10,
    },


})
export default AfspraakList