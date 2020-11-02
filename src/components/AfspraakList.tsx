import React, { useContext } from 'react'
import { Context as AfspraakContext } from '../context/AfspraakContext'
import { deleteAfspraak } from '../actions/AfspraakActions'
import { ToolbarAndroidBase } from 'react-native'

const AfspraakList: React.FC = () => {
    const {
        state: {afspraken},
        dispatch
    } = useContext(AfspraakContext)

    const deleteHandler = (id: string) => dispatch(deleteAfspraak(id)) 

    return afspraken.length > 0 ? (
        <ul>
            {afspraken.map(({id, title, description}) => (
                <li key={id}>
                    {title} {description} - <button onClick={() => deleteHandler(id)}>Delete</button>
                </li>
            ))}
        </ul>
    ) : (
        <h2>Geen afspraken gevonden</h2>
    )

}

export default AfspraakList