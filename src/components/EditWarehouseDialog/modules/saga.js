/**
 * Created by chenming on 2016/12/1.
 */

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_EDITWAREHOUSEDETAILDIALOG_DATA,
  GET_EDITWAREHOUSEDETAILDIALOG_SUCCESS,
  GET_EDITWAREHOUSEDETAILDIALOG_FAIL,

  PUT_EDITWAREHOUSEDETAILDIALOG_DATA,
  PUT_EDITWAREHOUSEDETAILDIALOG_SUCCESS,
  PUT_EDITWAREHOUSEDETAILDIALOG_FAIL,

  POST_CREATENEWWAREHOUSE_DATA,
  POST_CREATENEWWAREHOUSE_DATA_SUCCESS,
  POST_CREATENEWWAREHOUSE_DATA_FAIL,

  GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA,
  GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_SUCCESS,
  GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_FAIL
} from './editWarehouseDialog.js'
import {
  getSingleWarehouInfo,
  editSingleWarehouseInfo,
  createNewWarehouse
} from 'api/CK'
import {
  getCitiesListAPI
} from 'api/XZQH'
/**
 * 获取仓库数据
 * */
function* getWarehouseDetailData(action) {
  try {
    const response = yield call(getSingleWarehouInfo, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_EDITWAREHOUSEDETAILDIALOG_SUCCESS,
        response: response.Result,
      })
    } else {
      yield put({
        type: GET_EDITWAREHOUSEDETAILDIALOG_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_EDITWAREHOUSEDETAILDIALOG_FAIL,
      error
    })
  }
}
/**
 * 编辑仓库
 * */
function * putWarehouseDetailData(action) {
  try {
    const response = yield call(editSingleWarehouseInfo, action.payload);
    if (response.Code === 0) {
      yield put({
        type: PUT_EDITWAREHOUSEDETAILDIALOG_SUCCESS,
        response,
      })
    } else {
      yield put({
        type: PUT_EDITWAREHOUSEDETAILDIALOG_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: PUT_EDITWAREHOUSEDETAILDIALOG_FAIL,
      error
    })
  }
}

 /**
  * 新建仓库
  * */
function * postCreateNewWarehouse(action) {
  try {
    const response = yield call(createNewWarehouse, action.payload);
    if (response.Code === 0) {
      yield put({
        type: POST_CREATENEWWAREHOUSE_DATA_SUCCESS,
        response,
      })
    } else {
      yield put({
        type: POST_CREATENEWWAREHOUSE_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: POST_CREATENEWWAREHOUSE_DATA_FAIL,
      error
    })
  }
}
/**
  * 获取行政区划ID
  * */
function * getLocationIdData(action) {
  try {
    const cityResponse = yield call(getCitiesListAPI, action.payload.params.provinceID);
    if (cityResponse.Code === 0) {
      const filterCityDataArray = cityResponse.Result.XZQHB.filter((value, index) => {
        return (action.payload.params.cityName === value.SS);
      })
      const countyResponse = yield call(getCitiesListAPI, filterCityDataArray[0].GUID);
      if (countyResponse.Code === 0) {
        const filterCountyDataArray = countyResponse.Result.XZQHB.filter((value, index) => {
          return (action.payload.params.countyName === value.QX);
        });
        yield put({
          type: GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_SUCCESS,
          locationID: filterCountyDataArray[0].GUID
        })
      } else {
        yield put({
          type: GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_FAIL,
          error: countyResponse.Message
        })
      }
    } else {
      yield put({
        type: GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_FAIL,
        error: cityResponse.Message
      })
    }


    // if (response.Code === 0) {
    //   yield put({
    //     type: POST_CREATENEWWAREHOUSE_DATA_SUCCESS,
    //     response,
    //   })
    // } else {
    //   yield put({
    //     type: POST_CREATENEWWAREHOUSE_DATA_FAIL,
    //     error: response.Message
    //   })
    // }
  } catch (error) {
    // yield put({
    //   type: POST_CREATENEWWAREHOUSE_DATA_FAIL,
    //   error
    // })
  }
}
/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetLocationIdData() {
  yield takeEvery(GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA, handleAPI(getLocationIdData))
}
export function* watchGetWarehouseDetailData() {
  yield takeEvery(GET_EDITWAREHOUSEDETAILDIALOG_DATA, handleAPI(getWarehouseDetailData))
}
export function *watchPutWarehouseDetailData() {
  yield takeEvery(PUT_EDITWAREHOUSEDETAILDIALOG_DATA, handleAPI(putWarehouseDetailData))
}
export function *watchPostCreateNewWarehouse() {
  yield takeEvery(POST_CREATENEWWAREHOUSE_DATA, handleAPI(postCreateNewWarehouse))
}
// 从api获取数据
