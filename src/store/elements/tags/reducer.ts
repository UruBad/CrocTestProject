import { Reducer } from 'redux'
import { ITagsState, TagsActionTypes } from './types'

export const initialState: ITagsState = {
  data: [],
  errors: undefined
}

const reducer: Reducer<ITagsState> = (state = initialState, action) => {
  switch (action.type) {
  	case TagsActionTypes.REQUEST: {
      return { ...state }
    }
    case TagsActionTypes.GET_ALL: {
      return { ...state, data: action.payload }
    }
    case TagsActionTypes.ERROR: {
      return { ...state, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as tagsReducer }
