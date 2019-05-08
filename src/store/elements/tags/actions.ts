import { action } from 'typesafe-actions'
import { TagsActionTypes, ITag } from './types'

export const fetchRequest = () => action(TagsActionTypes.REQUEST)

export const fetchSuccess = (data: ITag[]) => action(TagsActionTypes.GET_ALL, data)
export const fetchError = (message: string) => action(TagsActionTypes.ERROR, message)
