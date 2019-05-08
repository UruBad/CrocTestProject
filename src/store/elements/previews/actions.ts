import { action } from 'typesafe-actions'
import { PreviewsActionTypes, IPreview } from './types'

export const fetchRequest = () => action(PreviewsActionTypes.REQUEST)

export const fetchSuccess = (data: IPreview[]) => action(PreviewsActionTypes.GET_ALL, data)
export const fetchError = (message: string) => action(PreviewsActionTypes.ERROR, message)
