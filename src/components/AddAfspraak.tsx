import React, { FormEvent, useRef, useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Context as AfspraakContext } from '../context/AfspraakContext'
import { addAfspraak } from '../actions/AfspraakActions'
import { TextInput } from 'react-native'

const AddAfspraak: React.FC = () => {
    const { dispatch } = useContext(AfspraakContext)
    const [titleValue , onChangeTitle] = React.useState("Titel hier")
    const [descriptionValue, onChangeDescription] = React.useState("Description hier")

    //const titleInputRef = useRef<HTMLInputElement>(null)
    //const descriptionInputRef = useRef<HTMLInputElement>(null)

    const submitHandler = (event: FormEvent) => {
        event.preventDefault()

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
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Titel</Text>
        <TextInput style={styles.input} onChangeText={text => onChangeTitle(text)} value={titleValue}/>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} onChangeText={text => onChangeDescription(text)} value={descriptionValue}/>
        <Button title="Voeg toe" onPress={() => submitHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
      label: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: 300,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        marginBottom: 5,
    },
    inputContainer: {
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }

})




export default AddAfspraak