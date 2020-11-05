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
            return {
                ...state,
                afspraken: [...state.afspraken, action.payload]
            }
        
        case "DELETE":
            return {
                ...state,
                afspraken: state.afspraken.filter((item) => item.id !== action.payload)
            }
        case "UPDATE":
            const updatedAfspraak = action.payload

            const updatedAfspraken = state.afspraken.map(item => {
                if(item.id !== updatedAfspraak.id) return updatedAfspraak 
                return item
            })

            
            return {
                ...state,
                afspraken: updatedAfspraken
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