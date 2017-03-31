/**
 * Created by liuyali on 2016/11/24.
 */

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
    HISTORY_RECOVERY_RECORDS,
    HISTORY_RECOVERY_RECORDS_SUCCESS,
    HISTORY_RECOVERY_RECORDS_ERROR,
} from '../modules/historyRecoveryRecords'

import {
    historyRecoveryRecordsAPI
} from 'api/CRK'

function *historyRecoveryRecords(action) {
  try {
    const result = yield call(historyRecoveryRecordsAPI, action.id);
    yield put({
      type: HISTORY_RECOVERY_RECORDS_SUCCESS,
      response: result.Result.CRKDB
    })
  } catch (error) {
    yield put({
      type: HISTORY_RECOVERY_RECORDS_ERROR,
      error
    });
  }
}
export function *watchHistoryRecoveryRecords() {
  yield takeEvery(HISTORY_RECOVERY_RECORDS, handleAPI(historyRecoveryRecords));
}
