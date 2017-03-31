/**
 * Created by NXQ on 11/15/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';
import _ from 'lodash';
import moment from 'moment';
import {
  GET_COOPERATIVE_PARTNER_DATA,
  GET_COOPERATIVE_PARTNER_DATA_SUCCESS
} from './cooperativePartnerDataGrid';

import {
  getPartnerAPI
} from 'api/ZZJGB';

import {
  getPartnerSummaryAPI
} from 'api/contract';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetCooperativePartnerData() {
  yield takeEvery(GET_COOPERATIVE_PARTNER_DATA, handleAPI(getCooperativePartnerQueryData));
}

const timeStampTransformationString = (timeStamp) => {
  let str = '';
  const diffDay = parseInt(Math.abs(timeStamp - new Date()) / 1000 / 60 / 60 / 24); // 把相差的毫秒数转换为天数
  if (timeStamp === 0) {
    str = '未签约';
  } else if (timeStamp >= new Date()) {
    if (diffDay > 60) {
      str = `已签约 (剩余${diffDay}天)`;
    } else {
      str = `待续约 (剩余${diffDay}天)`;
    }
  } else if (timeStamp < new Date()) {
    str = `已失效 (过期${diffDay}天)`
  }
  return str;
};
/**
 *  获取合作伙伴签约详情(已签约和未签约)
 *  0铺货 1备货 2手术 3借货 4调货 5铺货 (RA)
 */
function* getCooperativePartnerQueryData(action) {
  const signContractResponse = yield call(getPartnerSummaryAPI, action.payload);
  const signPartnerArray = signContractResponse.Result.summary.map(value => ({
    ...value,
    partnerId: value.authorized_organization_id,
    partnerName: value.authorized_organization_name || '机构无名称',
    surgeryState: value['2'] ? timeStampTransformationString(value['2'].stop_time) : '未签约',   // 手术
    stockState: value['1'] ? timeStampTransformationString(value['1'].stop_time) : '未签约'      // 备货
  }));
  let noSignPartnerArray = [];
  const parthnerResponse = yield call(getPartnerAPI, action.payload);
  const parthnerArray = parthnerResponse.Result.JXSGXB.map(value => ({
    partnerId: value.GLJXSID,
    partnerName: value.ZZJGB.JGMC || '机构无名称'
  }));
  if (parthnerArray.length) {
    noSignPartnerArray = _.differenceBy(parthnerArray, signPartnerArray, 'partnerId');  // 获取未签约的合作伙伴
  }
  yield put({
    type: GET_COOPERATIVE_PARTNER_DATA_SUCCESS,
    signPartnerResponse: signPartnerArray,
    noSignPartnerResponse: noSignPartnerArray
  });
  // let signPartnerArray = signContractResponse.Result.summary.map(value => {
  //   return {
  //     ...value,
  //     partnerId: value.authorized_organization_id,
  //     partnerName: value.authorized_organization_name || '机构无名称',
  //     surgeryState: timeStampTransformationString(value['2']),   // 手术
  //     stockState: timeStampTransformationString(value['1'])      // 备货
  //   }
  // });
  // let noSignPartnerArray = [];
  // const parthnerResponse = yield call(getPartnerAPI, action.payload);
  // let parthnerArray = parthnerResponse.Result.JXSGXB.map(value => {
  //   return {
  //     partnerId: value.GLJXSID,
  //     partnerName: value.ZZJGB.JGMC || '机构无名称'
  //   }
  // });
  // if (parthnerArray.length) {
  //   noSignPartnerArray = _.differenceBy(parthnerArray, signPartnerArray, 'partnerId');  //获取未签约的合作伙伴
  // }
  // yield put({
  //   type: GET_COOPERATIVE_PARTNER_DATA_SUCCESS,
  //   signPartnerResponse: signPartnerArray,
  //   noSignPartnerResponse: noSignPartnerArray
  // });
}
