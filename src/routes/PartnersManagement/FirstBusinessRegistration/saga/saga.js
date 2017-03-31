/**
 * Created by liuyali on 2016/11/22.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'

import {
  FIRST_CHECKIN_CREATE_ORG,
  FIRST_CHECKIN_CREATE_ORG_SUCCESS,
  FIRST_CHECKIN_CREATE_ORG_ERROR,

} from '../modules/FirstBusinessRegistration'

import {
  GET_RELATED_ORG,
  GET_RELATED_ORG_SUCCESS,
  GET_RELATED_ORG_ERROR,
} from '../modules/getRelatedOrg'

import {
  GET_ORG_CERTIFICATES,
  GET_ORG_CERTIFICATES_SUCCESS,
  GET_ORG_CERTIFICATES_ERROR,
} from '../modules/getOrgCertificates'

import {
  GET_ENTERPRISE_INFORMATION,
  GET_ENTERPRISE_INFORMATION_SUCCESS,
  GET_ENTERPRISE_INFORMATION_ERROR,
} from '../modules/getEnterpriseInformation'

import {
  getBasicInfoData
} from 'routes/BusinessManagement/BasicInformation/modules/BasicInformation'

import {
  getEnterpriseInformation
} from 'routes/PartnersManagement/FirstBusinessRegistration/modules/getEnterpriseInformation'

import {
  createOrgAPI, addCooperatorAPI, getRelatedOrgAPI, getCertificateListAPI, getEnterpriseInformationAPI
} from 'api/ZZJGB'

import {
  getImgSrc
} from 'lib/utils'


function *createOrg(action) {
  try {
    const result = yield call(createOrgAPI, action.cooperatorName);

    action.imgArr.map((img, index) => {
      if (Object.prototype.toString.call(img) === '[object Object]') {
        img.info.WDB.SSJXSID = result.Result.ZZJGB.GUID;
        img.orgId = result.Result.ZZJGB.GUID;
        img.formdata.append('Body', JSON.stringify(img.info));
      }
    });


    yield put(getBasicInfoData(action.imgArr)); // 上传图片、创建组织机构证件表
    yield call(addCooperatorAPI, { JXSID: action.orgId, GLJXSID: result.Result.ZZJGB.GUID, SXJ: action.SelectTypeValue });

    yield put({
      type: FIRST_CHECKIN_CREATE_ORG_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: FIRST_CHECKIN_CREATE_ORG_ERROR,
      error
    });
  }
}

function *getEnterpriseInfor(action) {
  try {
    const result = yield call(getEnterpriseInformationAPI, { id: action.orgId });
    const response = result.Result;
    // const response = result.Result.JXSGXB.map((org, index) => ({
    //   cooperatorName: org.ZZJGB.JGMC,
    //   orgId: org.ZZJGB.GUID,
    //   data: org.ZZJGB.CJSJ,
    //   cooperatorType: org.ZZJGB.JGLX === 'Y' ? '经销商/医院' : '供应商',
    //   status: org.ZZJGB.SHZT === '1' ? '审核通过' : '待审核'
    // }));

    yield put({
      type: GET_ENTERPRISE_INFORMATION_SUCCESS,
      data: response,
      // currentPage: action.page,
      // total: result.Result.Total,
    });
  } catch (error) {
    yield put({
      type: GET_ENTERPRISE_INFORMATION_ERROR,
      error
    });
  }
}
function *getRelatedOrg(action) {
  try {
    const result = yield call(getRelatedOrgAPI, { page: action.page, id: action.id });
    console.log('formaterformaterresult', result);
    const response = result.Result.JXSGXB.map((org, index) => ({
      cooperatorName: org.ZZJGB.JGMC,
      orgId: org.ZZJGB.GUID,
      date: org.CJSJ,
      cooperatorType: org.ZZJGB.JGLX === 'Y' ? '经销商/医院' : '供应商',
      status: org.ZZJGB.SHZT === '1' ? '审核通过' : '待审核'
    }));

    yield put({
      type: GET_RELATED_ORG_SUCCESS,
      data: response,
      currentPage: action.page,
      total: result.Result.Total,
    });
  } catch (error) {
    yield put({
      type: GET_RELATED_ORG_ERROR,
      error
    });
  }
}

function *getOrgCertificate(action) {
  try {
    const result = yield call(getCertificateListAPI, action.id);
    let response = [];
    if (Object.prototype.toString.call(result.Result) === '[object Object]') {
      response = result.Result.ZZJGZJB.map((org, index) => ({
        GUID: org.WDB.GUID ? getImgSrc(org.WDB.GUID) : '/emptyState.jpg',
        WDMC: org.ZJMC,
      }))
    }
    yield put({
      type: GET_ORG_CERTIFICATES_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: GET_ORG_CERTIFICATES_ERROR,
      error
    });
  }
}
export function* watchCreateOrg() {
  yield takeEvery(FIRST_CHECKIN_CREATE_ORG, createOrg);
}

export function* watchgetRelatedOrg() {
  yield takeEvery(GET_RELATED_ORG, getRelatedOrg);
}

export function* watchgetOrgCertificate() {
  yield takeEvery(GET_ORG_CERTIFICATES, getOrgCertificate);
}
export function* watchgetEnterpriseInfor() {
  yield takeEvery(GET_ENTERPRISE_INFORMATION, getEnterpriseInfor);
}
