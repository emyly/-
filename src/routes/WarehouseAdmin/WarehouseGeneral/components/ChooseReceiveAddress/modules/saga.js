/**
 * Created by magellan on 2016/12/9.
 */

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_LOGISTICADRESSLIST_DATA,
  GET_LOGISTICADRESSLIST_DATA_SUCCESS,
  GET_LOGISTICADRESSLIST_DATA_FAIL,

  POST_CHOOSERECEIVEADDRESS_DATA,
  POST_CHOOSERECEIVEADDRESS_DATA_SUCCESS,
  POST_CHOOSERECEIVEADDRESS_DATA_FAIL,

  POST_DELETEADDRESS_DATA,
  POST_DELETEADDRESS_DATA_SUCCESS,
  POST_DELETEADDRESS_DATA_FAIL,

  PUT_EDITRECEIVEADDRESS_DATA,
  PUT_EDITRECEIVEADDRESS_DATA_SUCCESS,
  PUT_EDITRECEIVEADDRESS_DATA_FAIL,

  POST_ADDORGANIZATIONADDRESS_DATA,
  POST_ADDORGANIZATIONADDRESS_DATA_SUCCESS,
  POST_ADDORGANIZATIONADDRESS_DATA_FAIL
} from './chooseReceiveAddress.js'
import {
  postEditLogiticAddress,
  getLogisticsAddressList,
  postDeleteAddress,
  putEditOneAddress,
  postChangeAddress
} from 'api/WLDB'


/**
 * 添加地址
 * */
function* postOrganizationAddress(action) {
  try {
    const response = yield call(postChangeAddress, action.payload);
    if (response.Code === 0) {
      yield put({
        type: POST_ADDORGANIZATIONADDRESS_DATA_SUCCESS,
        response,
      })
    } else {
      yield put({
        type: POST_ADDORGANIZATIONADDRESS_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: POST_ADDORGANIZATIONADDRESS_DATA_FAIL,
      error
    })
  }
}
/**
 * 编辑地址
 * */
function* putEditOneAddressData(action) {
  try {
    const response = yield call(putEditOneAddress, action.payload);
    if (response.Code === 0) {
      yield put({
        type: PUT_EDITRECEIVEADDRESS_DATA_SUCCESS,
        response,
      })
    } else {
      yield put({
        type: PUT_EDITRECEIVEADDRESS_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: PUT_EDITRECEIVEADDRESS_DATA_FAIL,
      error
    })
  }
}
/**
 * 删除地址
 * */
function* postDeleteAddressData(action) {
  try {
    const response = yield call(postDeleteAddress, action.payload);
    if (response.Code === 0) {
      yield put({
        type: POST_DELETEADDRESS_DATA_SUCCESS,
        response,
      })
    } else {
      yield put({
        type: POST_DELETEADDRESS_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: POST_DELETEADDRESS_DATA_FAIL,
      error
    })
  }
}
/**
 * 获取默认收发货地址
 * */
function* getLogisticsAddressListData(action) {
  try {
    const response = yield call(getLogisticsAddressList, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_LOGISTICADRESSLIST_DATA_SUCCESS,
        response,
      })
    } else {
      yield put({
        type: GET_LOGISTICADRESSLIST_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_LOGISTICADRESSLIST_DATA_FAIL,
      error
    })
  }
}
/**
 * 修改默认收发货地址
 * */
function* postChangeReceiveAddressData(action) {
  try {
    const response = yield call(postEditLogiticAddress, action.payload);
    if (response.Code === 0) {
      yield put({
        type: POST_CHOOSERECEIVEADDRESS_DATA_SUCCESS,
        response,
      })
    } else {
      yield put({
        type: POST_CHOOSERECEIVEADDRESS_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: POST_CHOOSERECEIVEADDRESS_DATA_FAIL,
      error
    })
  }
}
/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchAddOrganizationAddressData() {
  yield takeEvery(POST_ADDORGANIZATIONADDRESS_DATA, handleAPI(postOrganizationAddress));
}
export function* watchPutEditAddressData() {
  yield takeEvery(PUT_EDITRECEIVEADDRESS_DATA, handleAPI(putEditOneAddressData));
}
export function* watchGetLogisticsAddressData() {
  yield takeEvery(GET_LOGISTICADRESSLIST_DATA, handleAPI(getLogisticsAddressListData));
}
export function* watchPostChooseReceiveAddressData() {
  yield takeEvery(POST_CHOOSERECEIVEADDRESS_DATA, handleAPI(postChangeReceiveAddressData));
}
export function* watchPostDeleteAddress() {
  yield takeEvery(POST_DELETEADDRESS_DATA, handleAPI(postDeleteAddressData));
}

