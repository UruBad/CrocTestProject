import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { TagsActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import { callApi } from '../../../utils/api'

function* handleFetch() {
  try {
    const res = yield call(callApi, 'get', '/tags');
     if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

export function* watchFetchRequest() {
  yield takeLatest(TagsActionTypes.REQUEST, handleFetch)
}

function* tagsSaga() {
  yield all([fork(watchFetchRequest)])
}

export default tagsSaga
