import React, { FormEvent, useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { Context as AfspraakContext } from '../context/AfspraakContext'
import { addAfspraak } from '../actions/AfspraakActions'
import { TextInput } from 'react-native'

const AddAfspraak: React.FC = () => {
    const { dispatch } = useContext(AfspraakContext)

    const [titleValue , onChangeTitle] = React.useState("Titel hier")
    const [descriptionValue, onChangeDescription] = React.useState("Description hier")

    const submitHandler = () => {
        if(titleValue.trim() === "" && descriptionValue.trim() === ""){
            return
        }

        dispatch(
                addAfspraak({
                    id: new Date().getTime().toString(),
                    title: titleValue,
                    description: descriptionValue
                })
        )

        onChangeTitle("Titel hier")
        onChangeDescription("Description hier")
    }

    return (
        <View>
        <Text>Titel</Text>
        <TextInput onChangeText={text => onChangeTitle(text)} value={titleValue}/>
        <Text>Description</Text>
        <TextInput onChangeText={text => onChangeDescription(text)} value={descriptionValue}/>
        <Button title="Voeg toe" onPress={submitHandler}/>
        </View>
    )
}

export default AddAfspraak