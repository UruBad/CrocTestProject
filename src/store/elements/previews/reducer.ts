import { Reducer } from 'redux'
import { IPreviewsState, PreviewsActionTypes } from './types'

export const initialState: IPreviewsState = {
  data: [],
  errors: undefined
}

const reducer: Reducer<IPreviewsState> = (state = initialState, action) => {
  switch (action.type) {
  	case PreviewsActionTypes.REQUEST: {
      return { ...state }
    }
    case PreviewsActionTypes.GET_ALL: {
        return { ...state, data: action.payload }
    }
    case PreviewsActionTypes.ERROR: {
      return { ...state, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as previewsReducer }
