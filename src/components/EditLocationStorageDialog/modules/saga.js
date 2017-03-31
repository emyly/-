/**
 * Created by chenming on 2016/12/1.
 */

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_EDITLOCATIONSTORAGE_DATA,
  GET_EDITLOCATIONSTORAGE_DATA_SUCCESS,
  GET_EDITLOCATIONSTORAGE_DATA_FAIL,

  PUT_EDITLOCATIONSTORAGEINFO_DATA,
  PUT_EDITLOCATIONSTORAGEINFO_DATA_SUCCESS,
  PUT_EDITLOCATIONSTORAGEINFO_DATA_FAIL,

  POST_CREATENEWLOCATIONSTORAGE_DATA,
  POST_CREATENEWLOCATIONSTORAGE_DATA_SUCCESS,
  POST_CREATENEWLOCATIONSTORAGE_DATA_FAIL
} from './editLocationStorageDialog.js'
import {
  getSingleLocationStorageData,
  editSingleLocationStorageInfo,
  createNewLocactionStorage
} from 'api/CK'
/**
 * 获取库位数据
 * */
function* getSingleLocationStorageDetailData(action) {
  try {
    const response = yield call(getSingleLocationStorageData, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_EDITLOCATIONSTORAGE_DATA_SUCCESS,
        response: response.Result,
      })
    } else {
      yield put({
        type: GET_EDITLOCATIONSTORAGE_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_EDITLOCATIONSTORAGE_DATA_FAIL,
      error
    })
  }
}
/**
 * 编辑库位数据
 * */
function* putEditLocationStorageData(action) {
  try {
    const response = yield call(editSingleLocationStorageInfo, action.payload);
    if (response.Code === 0) {
      yield put({
        type: PUT_EDITLOCATIONSTORAGEINFO_DATA_SUCCESS,
        response,
      })
    } else {
      yield put({
        type: PUT_EDITLOCATIONSTORAGEINFO_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: PUT_EDITLOCATIONSTORAGEINFO_DATA_FAIL,
      error
    })
  }
}
/**
 * 新建库位
 * */
function* postCreateNewLocationStorage(action) {
  try {
    const response = yield call(createNewLocactionStorage, action.payload);
    if (response.Code === 0) {
      yield put({
        type: POST_CREATENEWLOCATIONSTORAGE_DATA_SUCCESS,
        response,
      })
    } else {
      yield put({
        type: POST_CREATENEWLOCATIONSTORAGE_DATA_FAIL,
        error: response
      })
    }
  } catch (error) {
    yield put({
      type: POST_CREATENEWLOCATIONSTORAGE_DATA_FAIL,
      error
    })
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetLocationStorageDialogData() {
  yield takeEvery(GET_EDITLOCATIONSTORAGE_DATA, handleAPI(getSingleLocationStorageDetailData))
}

export function* watchPutEditLocationStorageData() {
  yield takeEvery(PUT_EDITLOCATIONSTORAGEINFO_DATA, handleAPI(putEditLocationStorageData))
}

export function* watchPostCreateNewLocationStorage() {
  yield takeEvery(POST_CREATENEWLOCATIONSTORAGE_DATA, handleAPI(postCreateNewLocationStorage))
}
