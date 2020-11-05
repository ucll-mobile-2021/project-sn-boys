import { IAfspraakAction, IAfspraakItem } from "../interface/Afspraak";

export const addAfspraak = (todo: IAfspraakItem): IAfspraakAction => ({
  type: "ADD",
  payload: todo
})

export const deleteAfspraak = (id: string):  IAfspraakAction => ({
  type: "DELETE",
  payload: id
})

export const updateAfspraak = (todo: IAfspraakItem): IAfspraakAction => ({
  type: "UPDATE",
  payload: todo
})