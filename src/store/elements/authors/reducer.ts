import { Reducer } from 'redux'
import { IAuthorsState, AuthorsActionTypes } from './types'

export const initialState: IAuthorsState = {
  data: [],
  errors: undefined
}

const reducer: Reducer<IAuthorsState> = (state = initialState, action) => {
  switch (action.type) {
  	case AuthorsActionTypes.REQUEST: {
      return { ...state }
    }
    case AuthorsActionTypes.GET_ALL: {
      return { ...state, data: action.payload }
    }
    case AuthorsActionTypes.ERROR: {
      return { ...state, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as authorsReducer }
