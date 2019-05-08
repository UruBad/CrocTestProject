import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { layoutReducer } from './layout/reducer'
import { ILayoutState } from './layout/types'

import elementsSaga from './elements/sagas'
import { elementsReducer } from './elements/reducer'
import { IElementState } from './elements/types'

import authorsSaga from './elements/authors/sagas'
import { authorsReducer } from './elements/authors/reducer'
import { IAuthorsState } from './elements/authors/types'

import typesSaga from './elements/types/sagas'
import { typesReducer } from './elements/types/reducer'
import { ITypesState } from './elements/types/types'

import tagsSaga from './elements/tags/sagas'
import { tagsReducer } from './elements/tags/reducer'
import { ITagsState } from './elements/tags/types'

import previewsSaga from './elements/previews/sagas'
import { previewsReducer } from './elements/previews/reducer'
import { IPreviewsState, PreviewsActionTypes } from './elements/previews/types'

export interface ApplicationState {
	layout: ILayoutState
  elements: IElementState,
  authors: IAuthorsState,
  types: ITypesState,
  tags: ITagsState,
  previews: IPreviewsState,
  router: RouterState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const createRootReducer = (history: History) =>
  combineReducers({
  	layout: layoutReducer,
    elements: elementsReducer,
    authors: authorsReducer,
    types: typesReducer,
    tags: tagsReducer,
    previews: previewsReducer,
    router: connectRouter(history)
  })

export function* rootSaga() {
  yield all([fork(elementsSaga)])
}