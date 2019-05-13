import { action } from 'typesafe-actions'
import { ElementActionTypes, ElementsPayload, ElementPayload } from './types'

export const fetchRequest = (params: any) => action(ElementActionTypes.REQUEST, params)
export const clearSelected = () => action(ElementActionTypes.CLEAR_SELECTED)

export const fetchSuccess = (data: ElementsPayload) => action(ElementActionTypes.GET_ALL, data)
export const fetchError = (message: string) => action(ElementActionTypes.ERROR, message)
export const selectElement = (element_id: string) => action(ElementActionTypes.SELECT_ELEMENT, element_id)
export const elementSelected = (element: ElementPayload) => action(ElementActionTypes.SELECTED, element)
