/**
 * Created by liuyali on 2016/11/5.
 */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  POST_BASICINFO_DATA,
  POST_BASICINFO_DATA_SUCCESS,
  POST_BASICINFO_DATA_ERROR,
  GET_CORPORATION_BASIC_INFO,
  GET_CORPORATION_BASIC_INFO_FAIL,
  GET_CORPORATION_BASIC_INFO_SUCCESS,
  PUT_CORPORATION_BASIC_INFO,
  PUT_CORPORATION_BASIC_INFO_FAIL,
  PUT_CORPORATION_BASIC_INFO_SUCCESS
} from '../modules/BasicInformation'

import {
  putFileAPI
} from 'api/WJFW'

import {
  orgAuthAPI, getOrgDetail, putCorporationBasicInfoAPI
} from 'api/ZZJGB'


function *putCorporationBasicInfo(action) {
  try {
    yield call(putCorporationBasicInfoAPI, { id: action.id, body: action.body });
    yield put({
      type: PUT_CORPORATION_BASIC_INFO_SUCCESS
    })
  } catch (error) {
    yield put({
      type: PUT_CORPORATION_BASIC_INFO_FAIL, error
    })
  }
}

function *getCorporationBasicInfo(action) {
  try {
    const result = yield call(getOrgDetail, action.id);
    yield put({
      type: GET_CORPORATION_BASIC_INFO_SUCCESS, response: result.Result.ZZJGB
    })
  } catch (error) {
    yield put({
      type: GET_CORPORATION_BASIC_INFO_FAIL, error
    })
  }
}

function * putBasicInfoData(action) {
  const idArr = [];
  try {
    const checkInfoArr = [];
    const imgArr = action.payload.imgArr;
      /*
      *  循环提交图片
      * */
    /* 保存更新图片的id*/
    for (let i = 0; i < imgArr.length; i++) {
      if (Object.prototype.toString.call(imgArr[i]) === '[object Object]') {
        idArr.push(imgArr[i].id);
      }
    }
    for (let i = 0; i < imgArr.length; i++) {
      let response;
      if (Object.prototype.toString.call(imgArr[i]) === '[object Object]') {
        response = yield call(putFileAPI, imgArr[i].formdata);
      }

      if (Object.prototype.toString.call(imgArr[i]) === '[object Object]' && imgArr[i].documentType === 'M') {
        /* 多证合一*/
        const checkInInfo1 = {
          ...response.Result.WDB,
          WDMC: '营业执照'// 文档名称
        };
        const checkInInfo2 = {
          ...response.Result.WDB,
          WDMC: '税务登记证'// 文档名称
        };
        const checkInInfo3 = {
          ...response.Result.WDB,
          WDMC: '组织机构代码证'// 文档名称
        };
        checkInfoArr.push(checkInInfo1, checkInInfo2, checkInInfo3);
      } else if (Object.prototype.toString.call(imgArr[i]) === '[object Object]' && imgArr[i].documentType !== 'M') {
        const checkInInfo = {
          ...response.Result.WDB,
          WDMC: imgArr[i].documentName// 文档名称
        };
        checkInfoArr.push(checkInInfo);
      }
    }
    /*
    * 机构认证
    * */
    yield call(orgAuthAPI, checkInfoArr);

    yield put({
      type: POST_BASICINFO_DATA_SUCCESS, idArr
    })
  } catch (error) {
    yield put({
      type: POST_BASICINFO_DATA_ERROR,
      error,
      idArr
    })
  }
}

// 获取用户信息
export function* watchPutBasicInfoData() {
  yield takeEvery(POST_BASICINFO_DATA, handleAPI(putBasicInfoData));
}

/* 获取组织机构信息*/
export function* watchGetCorporationBasicInfo() {
  yield takeEvery(GET_CORPORATION_BASIC_INFO, handleAPI(getCorporationBasicInfo));
}

/* 更新组织机构信息*/
export function* watchPutCorporationBasicInfo() {
  yield takeEvery(PUT_CORPORATION_BASIC_INFO, handleAPI(putCorporationBasicInfo));
}
