import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_AUTHORIZED_ORGANIZATION,
  GET_AUTHORIZED_ORGANIZATION_SUCCESS,
  GET_AUTHORIZE_TYPES,
  GET_AUTHORIZE_TYPES_SUCCESS,
  GET_OPERATE_NAME,
  GET_OPERATE_NAME_SUCCESS,
  GET_OPERATE_TEMPLETS,
  GET_OPERATE_TEMPLETS_SUCCESS,
  GET_OPERATE_PART,
  GET_OPERATE_PART_SUCCESS,
  GET_OPERATE_INTOROAD,
  GET_OPERATE_INTOROAD_SUCCESS,
  GET_RECEIVE_ADDRESS,
  GET_RECEIVE_ADDRESS_SUCCESS,
  GET_SALE_LIST,
  GET_SALE_LIST_SUCCESS,
  GET_DOCTOR_LIST,
  GET_DOCTOR_LIST_SUCCESS,
  POST_SURGERY_ORDER,
  POST_SURGERY_ORDER_SUCCESS,
  GET_PRODUCTION_LIST,
  GET_PRODUCTION_LIST_SUCCESS,
  GET_DISTRIBUTION,
  GET_DISTRIBUTION_SUCCESS,
  SURGERY_ORDER_ERROR
} from './createOrder.js'

import { getContractsAPI, getAuthorizedOrganizationAPI, getAuthorizeTypesAPI, getAuthorizeTempletsAPI } from 'api/authorization'
import { getOperateNameAPI, getOperatePartAPI, getOperateIntoRoadAPI } from 'api/publicApi'
import { getSendReceiveAddAPI } from 'api/WLDB'
import { getSaleListAPI } from 'api/JXSXSDBGLB'
import { atSelectAPI } from 'api/ZZJGB'
import { postZXTGSSDDAPI, postSSFXDDAPI } from 'api/DDB'
import { getProductionListAPI } from 'api/SPJCXXB';

export function* watchGetDistribution() {
  yield takeEvery(GET_DISTRIBUTION, handleAPI(getDistribution))
}

export function* watchGetProductionList() {
  yield takeEvery(GET_PRODUCTION_LIST, handleAPI(getProductionList))
}

export function* watchPostSurgeryOrder() {
  yield takeEvery(POST_SURGERY_ORDER, handleAPI(postSurgeryOrder))
}

export function* watchGetAuthorizeOrganization() {
  yield takeEvery(GET_AUTHORIZED_ORGANIZATION, handleAPI(getAuthorizeOrganization))
}

export function* watchGetAuthorizeTypes() {
  yield takeEvery(GET_AUTHORIZE_TYPES, handleAPI(getAuthorizeTypes))
}

export function* watchGetOperateName() {
  yield takeEvery(GET_OPERATE_NAME, handleAPI(getOperateName))
}

export function* watchGetAuthorizeTemplets() {
  yield takeEvery(GET_OPERATE_TEMPLETS, handleAPI(getAuthorizeTemplets))
}

export function* watchGetOperatePart() {
  yield takeEvery(GET_OPERATE_PART, handleAPI(getOperatePart))
}

export function* watchGetOperateIntoRoad() {
  yield takeEvery(GET_OPERATE_INTOROAD, handleAPI(getOperateIntoRoad))
}

export function* watchGetReceiveAddress() {
  yield takeEvery(GET_RECEIVE_ADDRESS, handleAPI(getReceiveAddress))
}

export function* watchGetDoctorList() {
  yield takeEvery(GET_DOCTOR_LIST, handleAPI(getDoctorList))
}

export function* watchGetSaleListAPI() {
  yield takeEvery(GET_SALE_LIST, handleAPI(getSaleList))
}

export function* getAuthorizeOrganization(action) {
  try {
    const [authorizeOrganization, contracts] = yield [call(getAuthorizedOrganizationAPI, action.payload), call(getContractsAPI, { contract_type: '2', authorize: true })]
    yield put({
      type: GET_AUTHORIZED_ORGANIZATION_SUCCESS,
      response: { authorizeOrganization: authorizeOrganization.Result.authorized_organizations || [], contracts: contracts.Result.contracts || [] }
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}

export function* getAuthorizeTypes(action) {
  try {
    const response = yield call(getAuthorizeTypesAPI, action.payload);
    yield put({
      type: GET_AUTHORIZE_TYPES_SUCCESS,
      response: response.Result.types
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}

export function* getOperateName(action) {
  try {
    const response = yield call(getOperateNameAPI, action.payload);
    yield put({
      type: GET_OPERATE_NAME_SUCCESS,
      response: response.Result.SSLXB.SSMCB || []
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}

export function* getAuthorizeTemplets(action) {
  try {
    const response = yield call(getAuthorizeTempletsAPI, action.payload);
    yield put({
      type: GET_OPERATE_TEMPLETS_SUCCESS,
      response: response.Result.templets || []
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}

export function* getOperatePart(action) {
  try {
    const response = yield call(getOperatePartAPI, action.payload);
    yield put({
      type: GET_OPERATE_PART_SUCCESS,
      response: response.Result.SSBWB || []
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}

export function* getOperateIntoRoad(action) {
  try {
    const response = yield call(getOperateIntoRoadAPI, action.payload);
    yield put({
      type: GET_OPERATE_INTOROAD_SUCCESS,
      response: response.Result.SSRLZDB || []
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}

export function* getReceiveAddress(action) {
  try {
    const response = yield call(getSendReceiveAddAPI, action.payload);
    yield put({
      type: GET_RECEIVE_ADDRESS_SUCCESS,
      response: response.Result.ZZJGWLDZB || []
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}

/**
 * 获取销售人员列表，包含代表和助理
 */
export function* getSaleList(action) {
  try {
    const [saleManage, saleAssistant] = yield [call(getSaleListAPI, { ...action.payload, XSRYLX: 0 }), call(getSaleListAPI, { ...action.payload, XSRYLX: 1 })]
    yield put({
      type: GET_SALE_LIST_SUCCESS,
      response: { saleManage: saleManage.Result.XSRY, saleAssistant: saleAssistant.Result.XSRY }
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}

/**
 * 获取医生列表
 */
export function* getDoctorList(action) {
  try {
    const response = yield call(atSelectAPI, action.payload);
    yield put({
      type: GET_DOCTOR_LIST_SUCCESS,
      response: response.Result.BMYHB
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}

/**
 * 提交手术订单
 */
export function* postSurgeryOrder(action) {
  try{
    let response;
    if (action.payload.isDistribute) {
      response = yield call(postSSFXDDAPI, action.payload);
    } else {
      response = yield call(postZXTGSSDDAPI, action.payload);
    }
    yield put({
      type: POST_SURGERY_ORDER_SUCCESS,
      response: response.Result.DDB
    })
  } catch(error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
  
}


/**
 *  根据商品Id数组获取商品信息
 */
export function* getProductionList(action) {
  try {
    const response = yield call(getProductionListAPI, action.payload);
    yield put({
      type: GET_PRODUCTION_LIST_SUCCESS,
      response: response.Result.goods || [],
      typeId: action.payload.typeId || 0
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}

/**
 *  获取分销商
 */
export function* getDistribution(action) {
  try {
    const response = yield call(getAuthorizedOrganizationAPI, action.payload);
    yield put({
      type: GET_DISTRIBUTION_SUCCESS,
      response: response.Result.authorized_organizations || []
    })
  } catch (error) {
    yield put({
      type: SURGERY_ORDER_ERROR,
      error
    })
  }
}
