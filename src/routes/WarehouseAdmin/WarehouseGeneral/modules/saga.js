import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  PATCH_FORBIDANDUSEWAREHOUSE_DATA,
  PATCH_FORBIDANDUSEWAREHOUSE_SUCCESS,
  PATCH_FORBIDANDUSEWAREHOUSE_ERROR,

  GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA,
  GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_SUCCESS,
  GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_ERROR
} from './chooseWarehouse.js'

import { forbidAndUserSingleWarehouse, getSingleLocationStorageProductionData } from 'api/CK'

export function* watchPatchForbidAndUseWarehouse() {
  yield takeEvery(PATCH_FORBIDANDUSEWAREHOUSE_DATA, handleAPI(postLogisticsDeliverySend))
}
export function* watchGetSingleLocationWarehouseData() {
  yield takeEvery(GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA, handleAPI(getSingleLocationWarehouseData))
}


export function* postLogisticsDeliverySend(action) {
  try {
    const response = yield call(forbidAndUserSingleWarehouse, action.payload);
    if (response.Code === 0) {
      yield put({
        type: PATCH_FORBIDANDUSEWAREHOUSE_SUCCESS,
        response
      })
    } else {
      yield put({
        type: PATCH_FORBIDANDUSEWAREHOUSE_ERROR,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: PATCH_FORBIDANDUSEWAREHOUSE_ERROR,
      response: error
    })
  }
}

export function* getSingleLocationWarehouseData(action) {
  console.debug('+++++++', action);
  try {
    const response = yield call(getSingleLocationStorageProductionData, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_SUCCESS,
        response,
        currentPage: action.payload.params.page
      })
    } else {
      yield put({
        type: GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_ERROR,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_ERROR,
      response: error
    })
  }
}
