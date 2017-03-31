/**
 * Created by liuyali on 2016/12/2.
 */
/**
 * Created by liuyali on 2016/11/2.
 */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  GET_LOCATION_DATA_PROVINCE,
  GET_LOCATION_DATA_PROVINCE_SUCCESS,
  GET_LOCATION_DATA_PROVINCE_ERROR,
  GET_AREA_OR_CITY_DATA,
  GET_AREA_OR_CITY_DATA_SUCCESS,
  GET_AREA_OR_CITY_DATA_ERROR,
  GET_ALLLOCATION_DATA,
  GET_ALLLOCATION_DATA_SUCCESS,
  GET_ALLLOCATION_DATA_ERROR
} from './location'

import {
  getProvincesListAPI, getCitiesListAPI, getXZQHBAPi
} from 'api/XZQH'

export function *watchLocation() {
  yield takeEvery(GET_LOCATION_DATA_PROVINCE, handleAPI(getLocationData));
}
export function *watchGetAllLocation() {
  yield takeEvery(GET_ALLLOCATION_DATA, handleAPI(getAllLocationData));
}
export function *watchGetCityOrAreaData() {
  yield takeEvery(GET_AREA_OR_CITY_DATA, handleAPI(getCityOrAreaData));
}
function *getAllLocationData(action) {
  try {
    const response = yield call(getXZQHBAPi);
    console.debug('result', response);
    const XZQHB = [];
    response.Result.XZQHB.map((father_value, father_index) => {
      if (father_value.GUID !== 1) {
        if (XZQHB.length !== 0) {
          let isFind = false;
          XZQHB.map((value, index) => {
            if (value.SName === father_value.S) {
              value.SubSSArray.push(father_value);
              isFind = true;
            }
          });
          if (!isFind) {
            const provinceData = {};
            provinceData.SName = father_value.S;
            provinceData.SID = father_value.GUID;
            provinceData.SubSSArray = [father_value];
            XZQHB.push(provinceData);
          }
        } else {
          const provinceData = {};
          provinceData.SName = father_value.S;
          provinceData.SID = father_value.GUID;
          provinceData.SubSSArray = [father_value];
          XZQHB.push(provinceData);
        }
      }
    });
    XZQHB.map((value, index) => {
      const SSArray = [];
      value.SubSSArray.map((sub_value, sub_index) => {
        if (sub_value.QX !== '' && sub_value.SS !== '' && sub_value.S !== '') {
          if (sub_index !== 0) {
            let isFind = false;
            SSArray.map((value_sub, index_sub) => {
              if (sub_value.SS === value_sub.SSName) {
                value_sub.SubQXArray.push(sub_value);
                isFind = true;
              }
            })
            if (!isFind) {
              const SSData = {};
              SSData.SSID = sub_value.GUID;
              SSData.FJID = sub_value.FJID;
              SSData.SSName = sub_value.SS;
              SSData.SubQXArray = [sub_value];
              SSArray.push(SSData);
            }
          } else {
            const SSData = {};
            SSData.SSID = sub_value.GUID;
            SSData.FJID = sub_value.FJID;
            SSData.SSName = sub_value.SS;
            SSData.SubQXArray = [sub_value];
            SSArray.push(SSData);
          }
        }
      });
      XZQHB[index].SubSSArray = SSArray;
    })
    if (response.Code === 0) {
      yield put({
        type: GET_ALLLOCATION_DATA_SUCCESS,
        response: XZQHB,
        allAreaArr: response.Result.XZQHB
      })
    } else {
      yield put({
        type: GET_ALLLOCATION_DATA_ERROR,
        response: response.Message,
      })
    }
  } catch (error) {
    yield put({
      type: GET_ALLLOCATION_DATA_ERROR,
      response: error
    })
  }
}
function *getCityOrAreaData(action) {
  try {
    const response = yield call(getCitiesListAPI, action.id);
    let resultArr;
    if (action.LX === 1) {
    /* 判断是否为直辖市*/
      if (response.Result.XZQHB[1].QX.trim()) {
        resultArr = [{
          name: response.Result.XZQHB[1].SS,
          GUID: action.id
        }];
      } else {
        resultArr = response.Result.XZQHB.map(SF => ({
          name: SF.SS,
          GUID: SF.GUID
        }));
      }
    } else {
      resultArr = response.Result.XZQHB.map(SF => ({
        name: SF.QX,
        GUID: SF.GUID
      }))
    }

    yield put({
      type: GET_AREA_OR_CITY_DATA_SUCCESS,
      resultArr: resultArr || [],
      LX: action.LX,
      GUID: action.id
    })
  } catch (error) {
    yield put({
      type: GET_AREA_OR_CITY_DATA_ERROR,
      error
    })
  }
}


function *getLocationData() {
  try {
    const response = yield call(getProvincesListAPI);
    const resultArr = response.Result.XZQHB.map(SF => ({
      name: SF.S,
      GUID: SF.GUID
    }));
    yield put({
      type: GET_LOCATION_DATA_PROVINCE_SUCCESS,
      resultArr: resultArr || [],
    });
  } catch (error) {
    yield put({
      type: GET_LOCATION_DATA_PROVINCE_ERROR,
      error
    })
  }
}

