import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_REGISTRATIONCERTIFICATE_DATA,
  GET_REGISTRATIONCERTIFICATE_DATA_SUCCESS,
  GET_REGISTRATIONCERTIFICATE_DATA_FAIL
} from './registrationCertificationDialog.js'
import {
  getRegistrationCertificateInfo
} from 'api/CFDA'

export function* watchGetRegistrationCertificatenData() {
  yield takeEvery(GET_REGISTRATIONCERTIFICATE_DATA, handleAPI(getRegistrationCertificateInfoDate))
}
// 获取数据
function* getRegistrationCertificateInfoDate(action) {
  try {
    const response = yield call(getRegistrationCertificateInfo, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_REGISTRATIONCERTIFICATE_DATA_SUCCESS,
        response,
      })
    } else {
      yield put({
        type: GET_REGISTRATIONCERTIFICATE_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_REGISTRATIONCERTIFICATE_DATA_FAIL,
      response: error

    })
  }
}
