import React, { FormEvent, useRef, useContext } from 'react'
import { Context as AfspraakContext } from '../context/AfspraakContext'
import { addAfspraak } from '../actions/AfspraakActions'

const AddAfspraak: React.FC = () => {
    const { dispatch } = useContext(AfspraakContext)

    const titleInputRef = useRef<HTMLInputElement>(null)
    const descriptionInputRef = useRef<HTMLInputElement>(null)

    const submitHandler = (event: FormEvent) => {
        event.preventDefault()

        const titleValue = titleInputRef.current!.value
        const descriptionValue = descriptionInputRef.current!.value

        if(titleValue.trim() === "" && descriptionValue.trim() === ""){
            return
        }

        dispatch(
                addAfspraak({
                    id: new Date().getTime().toString(),
                    title: titleInputRef.current!.value,
                    description: descriptionInputRef.current!.value
                })
        )

        titleInputRef.current!.value = ""
        descriptionInputRef.current!.value = ""
    }
    return (
        <form>
            <input type="text" placeholder="Titel" ref={titleInputRef}/>
            <input type="text" placeholder="Beschrijving" ref={descriptionInputRef}/>
            <button type="button" onClick={submitHandler}>Voeg toe</button> 
        </form>
    )
}

export default AddAfspraak