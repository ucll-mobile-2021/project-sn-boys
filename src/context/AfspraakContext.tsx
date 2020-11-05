import React, { useReducer } from "react"
import { IAfspraakAction, IAfspraakList, IAfspraakItem, IContextModel } from '../interface/Afspraak'

const defaultState: IAfspraakList = {
    afspraken: []
}

const reducer = (
    state: IAfspraakList,
    action: IAfspraakAction
): IAfspraakList => {
    switch(action.type) {
        case "ADD":
            state.afspraken.push(action.payload)
            return {
                ...state,
                afspraken: state.afspraken
            }
        
        case "DELETE":
            return {
                ...state,
                afspraken: state.afspraken.filter((item) => item.id !== action.payload)
            }
        case "UPDATE":
            const updatedAfspraak = action.payload

            const updatedAfspraken = state.afspraken.map(item => {
                if(item.id === updatedAfspraak.id) return updatedAfspraak 
                return item
            })
            state.afspraken = updatedAfspraken
            return {
                ...state,
                afspraken: state.afspraken
            }
    }
}

export const Context = React.createContext({} as IContextModel)

export const Provider: React.FC = ({children}) => {
    const [ state, dispatch] = useReducer(reducer, defaultState)
    return (
        <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
    )
}