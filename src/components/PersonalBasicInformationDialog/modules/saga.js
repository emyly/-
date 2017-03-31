/**
* Created by liuyali on 2016/11/4.
*/
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {
  handleAPI,
  getSignature
} from 'lib/utils'

import {
  GET_PSNLBASICINFO_DATA,
  GET_PSNLBASICINFO_DATA_SUCCESS,
  GET_PSNLBASICINFO_DATA_ERROR,
  PUT_PSNLBASICINFO_DATA,
  PUT_PSNLBASICINFO_DATA_SUCCESS,
  PUT_PSNLBASICINFO_DATA_ERROR,
  EXIT_DATA,
  EXIT_DATA_SUCCESS,
  EXIT_DATA_ERROR
} from './PersonalBasicInformationDialog'

import {
  getPersonalBasicInfoAPI,
  putPersonalBasicInfoAPI,
  exitAPI
} from 'api/YH'

import {
  putFileAPI
} from 'api/WJFW'

function *getPersonalBasicInfoData(action) {
  try {
    const response = yield call(getPersonalBasicInfoAPI, action.payload);
    /*
    * 获取头像
    * */
    const WDID = response.Result.YHB.WDID;
    const headerImg = WDID ? `/api_firstgridFS/WDB/${WDID}?${getSignature()}` : '/default.jpg';

    const resultObj = {
      imgsrc: headerImg,
      companyName: response.Result.YHB.SSJG,
      name: response.Result.YHB.YHXM,
      gender: response.Result.YHB.XB,
      nickName: response.Result.YHB.NC,
      telephone: response.Result.YHB.SJHM,
      contact: response.Result.YHB.LXDH,
      job: response.Result.YHB.ZW,
      email: response.Result.YHB.DZYX,
      WDID
    };

    yield put({
      type: GET_PSNLBASICINFO_DATA_SUCCESS,
      response: resultObj || {}
    })
  } catch (error) {
    yield put({
      type: GET_PSNLBASICINFO_DATA_ERROR,
      response: error
    })
  }
}

function *putPersonalBasicInfoData(action) {
  try {
    let result;
    if (action.payload.imgChange) {
      const WDInfo = yield call(putFileAPI, action.payload.imgData);

      const WDID = WDInfo.Result.WDB.GUID;
      const userInfo = action.payload.info;
      userInfo.WDID = WDID;

      const req = {
        userInfo,
        id: action.payload.id
      }
      yield call(putPersonalBasicInfoAPI, req);

      const headerImg = WDID ? `/api_firstgridFS/WDB/${WDID}?${getSignature()}` : '/default.jpg';
      result = {
        nickName: action.payload.info.NC,
        contact: action.payload.info.LXDH,
        gender: action.payload.info.XB, // 性别
        job: action.payload.info.ZW,
        email: action.payload.info.DZYX, // 电子邮箱
        imgsrc: headerImg
      }
    } else {
      const req = {
        userInfo: action.payload.info,
        id: action.payload.id
      }

      yield call(putPersonalBasicInfoAPI, req);

      result = {
        nickName: action.payload.info.NC,
        contact: action.payload.info.LXDH,
        gender: action.payload.info.XB, // 性别
        job: action.payload.info.ZW,
        email: action.payload.info.DZYX, //电子邮箱
      }
    }
    yield put({
      type: PUT_PSNLBASICINFO_DATA_SUCCESS,
      response: Object.assign({}, action.payload.userData, result)
    })
  } catch (error) {
    yield put({
      type: PUT_PSNLBASICINFO_DATA_ERROR,
      error
    })
  }
}

function *exit() {
  try {
    const result = yield call(exitAPI);
    if (result.Code === 0) {
      yield put({
        type: EXIT_DATA_SUCCESS
      })
      sessionStorage.removeItem('USER_INFO')
      localStorage.setItem('removeUserInfo', Date.now())
    } else {
      yield put({
        type: EXIT_DATA_ERROR,
        response: result.error
      })
    }
  } catch (error) {
    yield put({
      type: EXIT_DATA_ERROR,
      response: error
    })
  }
}

/* 用户退出部分*/
export function *watchExit() {
  yield takeEvery(EXIT_DATA, handleAPI(exit));
}

// 提交用户信息
export function *watchPutPersonalBasicInfoData() {
  yield takeEvery(PUT_PSNLBASICINFO_DATA, handleAPI(putPersonalBasicInfoData));
}

// 获取用户信息
export function *watchGetPersonalBasicInfoData() {
  yield takeEvery(GET_PSNLBASICINFO_DATA, handleAPI(getPersonalBasicInfoData));
}
