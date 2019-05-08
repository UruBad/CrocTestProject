import { Reducer } from 'redux'
import { ITypesState, TypesActionTypes } from './types'

export const initialState: ITypesState = {
  data: [],
  errors: undefined
}

const reducer: Reducer<ITypesState> = (state = initialState, action) => {
  switch (action.type) {
  	case TypesActionTypes.REQUEST: {
      return { ...state }
    }
    case TypesActionTypes.GET_ALL: {
      return { ...state, data: action.payload }
    }
    case TypesActionTypes.ERROR: {
      return { ...state, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as typesReducer }
