import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_SELECTRECORD_DATA,
  GET_SELECTRECORD_DATA_SUCCESS,
  GET_SELECTRECORD_DATA_FAIL
} from './selectProductionRecordTable.js'
import {
  historyWarehousingAPI
} from 'api/DDB'

export function* watchgetSelectProductionRecord() {
  console.debug('saga.js getSelectProductionRecord');
  yield takeEvery(GET_SELECTRECORD_DATA, handleAPI(getSelectProductionRecord))
}

function* getSelectProductionRecord(action) {
  try {
    const response = yield call(historyWarehousingAPI, action.payload);
    console.debug('saga.js getSelectProductionRecord:', action);
    console.debug('saga.js getSelectProductionRecord:', response);
    if (response.Code === 0) {
      const resultArray = response.Result.CRKDB;
      yield put({
        type: GET_SELECTRECORD_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_SELECTRECORD_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_SELECTRECORD_DATA_FAIL,
      response: error
    })
  }
}
