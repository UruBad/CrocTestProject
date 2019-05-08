import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ElementActionTypes } from './types'
import { fetchError, fetchSuccess, fetchRequest } from './actions'
import { callApi } from '../../utils/api'

import { watchFetchRequest as watchFetchRequestPreviews} from './previews/sagas'
import { watchFetchRequest as watchFetchRequestTypes} from './types/sagas'
import { watchFetchRequest as watchFetchRequestTags} from './tags/sagas'
import { watchFetchRequest as watchFetchRequestAuthors} from './authors/sagas'

function* handleFetch(params: ReturnType<typeof fetchRequest>) {
  try {
    const res = yield call(callApi, 'get', '/items', params.payload);
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

function* watchFetchRequest() {
  yield takeEvery(ElementActionTypes.REQUEST, handleFetch)
}

function* elementsSaga() {
  yield all([fork(watchFetchRequest), fork(watchFetchRequestPreviews), fork(watchFetchRequestTypes),
    fork(watchFetchRequestTags), fork(watchFetchRequestAuthors)]);
}

export default elementsSaga
