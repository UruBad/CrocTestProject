import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { layoutReducer } from './layout/reducer'
import { ILayoutState } from './layout/types'

import elementsSaga from './elements/sagas'
import { elementsReducer } from './elements/reducer'
import { IElementState } from './elements/types'

export interface ApplicationState {
	layout: ILayoutState
  elements: IElementState,
  router: RouterState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const createRootReducer = (history: History) =>
  combineReducers({
  	layout: layoutReducer,
    elements: elementsReducer,
    router: connectRouter(history)
  })

export function* rootSaga() {
  yield all([fork(elementsSaga)])
}