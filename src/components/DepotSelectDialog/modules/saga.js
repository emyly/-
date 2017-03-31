import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_WAREHOUSEFORNEED_DATA,
  GET_WAREHOUSEFORNEED_DATA_SUCCESS,
  GET_WAREHOUSEFORNEED_DATA_FAIL,
  GET_LOCATION_DATA,
  GET_LOCATION_DATA_SUCCESS,
  GET_LOCATION_DATA_FAIL,
  GET_CHILDLOCATION_DATA,
  GET_CHILDLOCATION_DATA_SUCCESS,
  GET_CHILDLOCATION_DATA_FAIL,
  GET_WAREHOUSE_DATA,
  GET_WAREHOUSE_DATA_SUCCESS,
  GET_WAREHOUSE_DATA_FAIL,
} from './depotSelectDialog.js'
import {
  getWarehouseForNeedDataAPI
} from 'api/CRK'
import {
  getLocationAPI,
  getChildLocationAPI,
  getWarehouseAPI
} from 'api/CK'

export function* watchGetWareHouseForNeedData() {
  yield takeEvery(GET_WAREHOUSEFORNEED_DATA, handleAPI(getWarehouseForNeedData))
}

export function* watchGetLocation() {
  yield takeEvery(GET_LOCATION_DATA, handleAPI(getLocation))
}

export function* watchGetChildLocation() {
  yield takeEvery(GET_CHILDLOCATION_DATA, handleAPI(getChildLocation))
}

export function* watchGetWarehouseData() {
  yield takeEvery(GET_WAREHOUSE_DATA, handleAPI(getWarehouse))
}

function* getWarehouseForNeedData(action) {
  try {
    const response = yield call(getWarehouseForNeedDataAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = action.payload.type ? response.Result.XNCKB : response.Result.XNKWB;
      if (Object.prototype.toString.call(resultArray) === '[object Array]') {
        const tpdata = resultArray.map(value => ({
          FJCKID: action.payload.crkid,
          id: action.payload.type ? value.CKID : value.KWID,
          name: action.payload.type ? value.CKMC : value.KWMC,
          need: value.SPZS,   // 订单商品所需种类的总数（同一商品编号的商品为一种）
          total: value.KCZS,  // 库存中满足订单要求的商品种类的总数
          type: action.payload.type ? 0 : 1,
          isWareHouse: !!action.payload.type   // true表示是仓库 false表示是库位
        }));        
        yield put({
          type: GET_WAREHOUSEFORNEED_DATA_SUCCESS,
          response: tpdata,
          isTopWarehouse: action.payload.ckid === 0
        });
      } else {
        yield put({
          type: GET_WAREHOUSEFORNEED_DATA_SUCCESS,
          response: []
        });
      }
    } else {
      yield put({
        type: GET_WAREHOUSEFORNEED_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_WAREHOUSEFORNEED_DATA_FAIL,
      response: error
    })
  }
}

function* getLocation(action) {
  try {
    const response = yield call(getLocationAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.KWB;
      if (Object.prototype.toString.call(resultArray) === '[object Array]') {
        const tpdata = resultArray.map(value => ({
          ...value,
          id: value.GUID,
          name: value.KWMC,
          need: 0,
          total: 0,
          type: 1,
          goodsTypes: value.SPZS || 0,    // 商品种类
          goodsTotals: value.KCSL || 0,   // 商品库存总数
          isWareHouse: false   // true表示是仓库 false表示是库位
        }));
        yield put({
          type: GET_LOCATION_DATA_SUCCESS,
          response: tpdata
        })
      } else {
        yield put({
          type: GET_LOCATION_DATA_SUCCESS,
          response: []
        })
      }
    } else {
      yield put({
        type: GET_LOCATION_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_LOCATION_DATA_FAIL,
      response: error
    })
  }
}

function* getChildLocation(action) {
  try {
    const response = yield call(getChildLocationAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.KWB;
      if (Object.prototype.toString.call(resultArray) === '[object Array]') {
        const tpdata = resultArray.map(value => ({
          ...value,
          id: value.GUID,
          name: value.KWMC,
          need: 0,
          total: 0,
          type: 1,
          goodsTypes: value.SPZS || 0,    // 商品种类
          goodsTotals: value.KCSL || 0,   // 商品库存总数
          isWareHouse: false   // true表示是仓库 false表示是库位
        }));
        yield put({
          type: GET_CHILDLOCATION_DATA_SUCCESS,
          response: tpdata
        })
      } else {
        yield put({
          type: GET_CHILDLOCATION_DATA_SUCCESS,
          response: []
        })
      }
    } else {
      yield put({
        type: GET_CHILDLOCATION_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_CHILDLOCATION_DATA_FAIL,
      response: error
    })
  }
}

function* getWarehouse(action) {
  try {
    const response = yield call(getWarehouseAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.CKB;
      if (Object.prototype.toString.call(resultArray) === '[object Array]') {
        const tpdata = resultArray.map(value => ({
          FJCKID: action.payload.id,
          id: value.GUID,
          name: value.CKMC,
          need: 0,
          total: 0,
          type: 0,
          goodsTypes: value.SPZS || 0,    // 商品种类
          goodsTotals: value.KCSL || 0,   // 商品库存总数
          isWareHouse: true   // true表示是仓库 false表示是库位
        }));
        yield put({
          type: GET_WAREHOUSE_DATA_SUCCESS,
          response: tpdata,
          isTopWarehouse: action.payload.id === 0
        })
      } else {
        yield put({
          type: GET_WAREHOUSE_DATA_SUCCESS,
          response: []
        })
      }
    } else {
      yield put({
        type: GET_WAREHOUSE_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_WAREHOUSE_DATA_FAIL,
      response: error
    })
  }
}
