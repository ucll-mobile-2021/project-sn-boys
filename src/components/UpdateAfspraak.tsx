import React, { FormEvent, useRef, useContext } from 'react'
import {View, Text, Button, StyleSheet, TextInput} from 'react-native'
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


    const [titleValue , onChangeTitle] = React.useState(afspraak.title)
    const [descriptionValue, onChangeDescription] = React.useState(afspraak.description)

    const submitHandler = () => {
        //const titleValue = titleInputRef.current!.value
        //const descriptionValue = descriptionInputRef.current!.value

        if(titleValue.trim() === "" || descriptionValue.trim() === ""){
            alert("Titel/Description mogen niet leeg zijn")
            return
        }

        dispatch(
                updateAfspraak({
                    id: afspraakId,
                    title: titleValue,
                    description: descriptionValue
                })
        )

            
        navigation.navigate('Login')

    }
    return (
        <View>
            <Text>{afspraak.id}</Text>
            <Text style={styles.label}>Titel</Text>
            <TextInput style={[styles.input, styles.shadowStyle]} onChangeText={text => onChangeTitle(text)} value={titleValue}/>
            <Text style={styles.label}>Description</Text>
            <TextInput style={[styles.input, styles.shadowStyle]} onChangeText={text => onChangeDescription(text)} value={descriptionValue}/>
            <Button title="Update afspraak" onPress={submitHandler}/>
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

export default UpdateAfspraak