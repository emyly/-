/**
 * Created by qyf on 2016/11/5.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_HISTORY_W_DATA,
  GET_HISTORY_W_DATA_SUCCESS
} from './historyWarehousingDataGrid'
import {
  historyWarehousingAPI
} from 'api/DDB'
export function* watchGetHistoryWarehousingData() {
  yield takeEvery(GET_HISTORY_W_DATA, handleAPI(getHistoryWarehousing))
}
// 数据获取
function* getHistoryWarehousing(action) {
  const response = yield call(historyWarehousingAPI, action.payload);
  const resultArray = response.Result.CRKDB;
  yield put({
    type: GET_HISTORY_W_DATA_SUCCESS,
    response: resultArray
  })
}
