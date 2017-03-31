import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_BARCODEOUT_DATA,
  GET_BARCODEOUT_DATA_SUCCESS,
  GET_BARCODEOUT_DATA_FAIL,
  GET_BARCODEIN_DATA,
  GET_BARCODEIN_DATA_SUCCESS,
  GET_BARCODEIN_DATA_FAIL,
  GET_TRAN_GOODS,
  GET_TRAN_GOODS_SUCCESS
} from './barCodeTextField.js'
import {
  getBarcodeOutAPI,
  getBarcodeInAPI
} from 'api/CRK'
import {
  getTransGoodsAPI
} from 'api/CK'

function* getBarcodeOut(action) {
  try {
    const response = yield call(getBarcodeOutAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.KWSPGLB;
      yield put({
        type: GET_BARCODEOUT_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_BARCODEOUT_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_BARCODEOUT_DATA_FAIL,
      response: error
    })
  }
}

function* getBarcodeIn(action) {
  try {
    const response = yield call(getBarcodeInAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.KWSPGLB;
      yield put({
        type: GET_BARCODEIN_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_BARCODEIN_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_BARCODEIN_DATA_FAIL,
      response: error
    })
  }
}

function* getTranGood(action) {
  const response = yield call(getTransGoodsAPI, action.payload)
  yield put({
    type: GET_TRAN_GOODS_SUCCESS,
    response: response.Result.SPCCB
  })
}

export function* watchGetBarcodeOutData() {
  yield takeEvery(GET_BARCODEOUT_DATA, handleAPI(getBarcodeOut))
}

export function* watchGetBarcodeInData() {
  yield takeEvery(GET_BARCODEIN_DATA, handleAPI(getBarcodeIn))
}

export function* watchGetTranGood() {
  yield takeEvery(GET_TRAN_GOODS, handleAPI(getTranGood))
}
