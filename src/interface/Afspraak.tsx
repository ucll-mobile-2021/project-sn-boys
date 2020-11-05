import React from 'react'

export type IAfspraakAction =
    | { type: "ADD"; payload: IAfspraakItem }
    | { type: "DELETE"; payload: string }
    | { type: "UPDATE"; payload: IAfspraakItem}

export interface IAfspraakItem {
    id: string
    title: string
    description: string
}

export interface IAfspraakList {
    afspraken: IAfspraakItem[]
}

export interface IContextModel {
    state: IAfspraakList
    dispatch: React.Dispatch<IAfspraakAction>
}