import React, { FormEvent, useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
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
        <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Titel</Text>
                <TextInput style={[styles.input, styles.shadowStyle]} onChangeText={text => onChangeTitle(text)} value={titleValue}/>
                <Text style={styles.label}>Description</Text>
                <TextInput style={[styles.input, styles.shadowStyle]} onChangeText={text => onChangeDescription(text)} value={descriptionValue}/>
                <Button title="Voeg toe" onPress={submitHandler}/>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({

    mainContainer: {
        alignItems: "center",
        display: "flex",
        textAlign:"left",
        borderBottomColor: "black",
        borderBottomWidth: 5,
    },
    inputContainer: {
        marginBottom: 25,
    },
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
        color: "grey",
        fontStyle: "italic",
    },

    button: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        backgroundColor: '#3F5EFB',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        width: 250,
        elevation: 4,
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 80,
    },

    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

})




export default AddAfspraak