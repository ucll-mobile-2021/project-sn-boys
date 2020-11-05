import React, { FormEvent, useRef, useContext } from 'react'
import {View, Text, Button} from 'react-native'
import { Context as AfspraakContext } from '../context/AfspraakContext'
import { updateAfspraak } from '../actions/AfspraakActions'
import { IAfspraakItem } from '../interface/Afspraak'
import { useNavigation } from '@react-navigation/native'

export const UpdateAfspraak: React.FC<{afspraakId: string}> = ({afspraakId}) => {
    const { state: {afspraken},
            dispatch
        } = useContext(AfspraakContext)
    
    const navigation = useNavigation()


    //Maak standaard afspraak aan
    let afspraak: IAfspraakItem = {id: afspraakId, title: "", description: ""}

    for(let i = 0; i < afspraken.length; i++){
        if(afspraken[i].id === afspraakId){
            afspraak = afspraken[i]
            break
        }
    } 


    const submitHandler = () => {
        //const titleValue = titleInputRef.current!.value
        //const descriptionValue = descriptionInputRef.current!.value

        //if(titleValue.trim() === "" && descriptionValue.trim() === ""){
        //    return
        //}

        dispatch(
                updateAfspraak({
                    id: afspraakId,
                    title: "test",
                    description: "test"
                })
        )

            
        navigation.navigate('Login')

    }
    return (
        <View>
            <Text>{afspraak.id}</Text>
            <Text>{afspraak.title}</Text>
            <Text>{afspraak.description}</Text>
            <Button title="Update afspraak" onPress={submitHandler}/>
        </View>
    )
}

export default UpdateAfspraak