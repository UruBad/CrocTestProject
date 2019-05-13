import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ElementActionTypes } from './types'
import { fetchError, fetchSuccess, fetchRequest, selectElement, elementSelected } from './actions'
import { callApi } from '../../utils/api'

function* getDictionaries(){
  const authors = yield call(callApi, 'get', '/authors');
  const types = yield call(callApi, 'get', '/types');
  const tags = yield call(callApi, 'get', '/tags');
  const previews = yield call(callApi, 'get', '/previews');

  return { authors, types, tags, previews };
}

function* handleFetch(params: ReturnType<typeof fetchRequest>) {
  try {
    var res = yield getDictionaries();
    res.elements = yield call(callApi, 'get', '/items', params.payload);
    
    if (res.elements.error) {
      yield put(fetchError(res.elements.error))
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

function* handleSelect(params: ReturnType<typeof selectElement>) {
  try {
    var res = yield getDictionaries();
    res.element = yield call(callApi, 'get', `/items/${params.payload}`)

    if (res.element.error) {
      yield put(fetchError(res.element.error))
    } else {
      yield put(elementSelected(res))
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

function* watchSelectElement() {
  yield takeLatest(ElementActionTypes.SELECT_ELEMENT, handleSelect)
}

function* elementsSaga() {
  yield all([fork(watchFetchRequest), fork(watchSelectElement)]);
}

export default elementsSaga
