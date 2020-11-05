import React, { FormEvent, useRef, useContext } from 'react'
import {View, Text, Button} from 'react-native'
import { Provider as AfspraakProvider } from '../context/AfspraakContext'
import { UpdateAfspraak } from '../components/UpdateAfspraak'

export const UpdateScreen: React.FC = ({route}:any) => {
    const afspraakId = route.params.id

    return (
        <View>
            <AfspraakProvider>
                <UpdateAfspraak afspraakId={afspraakId}/>
            </AfspraakProvider>
        </View>
    )
}

export default UpdateScreen