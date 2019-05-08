import { Reducer } from 'redux'
import { IElementState, ElementActionTypes } from './types'

export const initialState: IElementState = {
  data: [],
  errors: undefined,
  loading: false
}

const reducer: Reducer<IElementState> = (state = initialState, action) => {
  switch (action.type) {
  	case ElementActionTypes.REQUEST: {
      return { ...state, loading: true, params: action.payload }
    }
    case ElementActionTypes.GET_ALL: {
      return { ...state, data: action.payload }
    }
    case ElementActionTypes.ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case ElementActionTypes.SELECT_ELEMENT: {
      return { ...state, loading: true }
    }
    case ElementActionTypes.SELECTED: {
      return { ...state, loading: false, selected: action.payload }
    }
    case ElementActionTypes.CLEAR_SELECTED: {
      return { ...state, selected: undefined }
    }
    default: {
      return state
    }
  }
}

export { reducer as elementsReducer }
