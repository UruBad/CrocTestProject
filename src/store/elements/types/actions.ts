import { action } from 'typesafe-actions'
import { TypesActionTypes, IType } from './types'

export const fetchRequest = () => action(TypesActionTypes.REQUEST)

export const fetchSuccess = (data: IType[]) => action(TypesActionTypes.GET_ALL, data)
export const fetchError = (message: string) => action(TypesActionTypes.ERROR, message)
