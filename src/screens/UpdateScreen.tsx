import React, { FormEvent, useRef, useContext } from 'react'
import {View, Text} from 'react-native'
import { Context as AfspraakContext } from '../context/AfspraakContext'
import { updateAfspraak } from '../actions/AfspraakActions'

export const UpdateScreen: React.FC = () => {
    const { state, dispatch } = useContext(AfspraakContext)

    const afspraakId: string = "test"

    const titleInputRef = useRef<HTMLInputElement>(null)
    //titleInputRef.current!.value = state.afspraken.find()

    const descriptionInputRef = useRef<HTMLInputElement>(null)
    //descriptionInputRef.current!.value = state.afspraken.find()

    const submitHandler = (event: FormEvent) => {
        event.preventDefault()

        const titleValue = titleInputRef.current!.value
        const descriptionValue = descriptionInputRef.current!.value

        if(titleValue.trim() === "" && descriptionValue.trim() === ""){
            return
        }

        dispatch(
                updateAfspraak({
                    id: afspraakId,
                    title: titleInputRef.current!.value,
                    description: descriptionInputRef.current!.value
                })
        )
    }
    return (
        <View><Text>test</Text></View>
    )
}

export default UpdateScreen