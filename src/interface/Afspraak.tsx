import React from 'react'

export type IAfspraakAction =
    | { type: "ADD"; payload: IAfspraakItem }
    | { type: "DELETE"; payload: string }

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