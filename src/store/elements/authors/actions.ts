import { action } from 'typesafe-actions'
import { AuthorsActionTypes, IAuthor } from './types'

export const fetchRequest = () => action(AuthorsActionTypes.REQUEST)

export const fetchSuccess = (data: IAuthor[]) => action(AuthorsActionTypes.GET_ALL, data)
export const fetchError = (message: string) => action(AuthorsActionTypes.ERROR, message)
