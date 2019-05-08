import { action } from 'typesafe-actions'
import { ElementActionTypes, IElement } from './types'

export const fetchRequest = (params: any) => action(ElementActionTypes.REQUEST, params)

export const fetchSuccess = (data: IElement[]) => action(ElementActionTypes.GET_ALL, data)
export const fetchError = (message: string) => action(ElementActionTypes.ERROR, message)
