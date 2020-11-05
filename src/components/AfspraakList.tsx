import React, { useContext } from 'react'
import {View, Text, Button} from 'react-native'
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
                <View>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Button title="Delete" onPress={() => deleteHandler(item.id)}></Button>
                    <Button title="Update" onPress={() => navigation.navigate('updateAfspraak')}></Button>
                </View>
                }>
        </FlatList>
        </View>
    ) : (
        <View>
            <Text>Geen afspraken gevonden</Text>
        </View>
    )

}

export default AfspraakList