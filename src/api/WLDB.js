
import { fetchAPI } from 'lib/utils'
/**
 * 1.新建物流单
 * */
export function postLogisticsDeliverySendAPI(params) {
  return fetchAPI('/WLDB', {
    method: 'POST',
    body: params.params
  })
}
/**
 * 2.物流发货商品汇总
 * */
export function getLogisticProductionDetailAPI(params) {
  return fetchAPI('/WLDB/CRKDB/CRKMXB', {
    method: 'GET',
    body: {}
  });
}
/**
 * 3.单个物流单查询
 * */
export function getLogisticDetailAPI(params) {
  return fetchAPI(`/WLDB/${params.params}`, {
    method: 'GET',
    body: {}
  });
}
/**
 *5.物流公司列表查询
 * */
export function getLogisticAPI() {
  return fetchAPI('/WLGSB', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
    body: {}
  });
}
/**
 * 6.物流发货入口订单列表查询
 * */
export function getLogisticsSendListAPI(params) {
  return fetchAPI(`/CRKDB/DDB/WLFH?Page=${params.params.page}&SortOrder=desc&PageSize=15&SortBy=`, {
    method: 'GET',
    body: params.params.dataParams
  });
}
/**
 * 10.查询某个组织机构的物流地址列表
 * */
export function getSendReceiveAddAPI({ JXSID, SFLX }) {
  const body = JSON.stringify({ SFLX: [SFLX], JXSID });
  return fetchAPI('/ZZJGWLDZB', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',

    body
  });
}
/**
 * 11.修改单个物流地址列表
 * */
export function putEditOneAddress(params) {
  return fetchAPI(`/ZZJGWLDZB/${params.params.GUID}`, {
    method: 'PUT',
    body: params.params.ZZJGWLDZB
  });
}
/**
 * 12.禁用单个物流地址列表
 * */
export function postDeleteAddress(params) {
  return fetchAPI(`/ZZJGWLDZB/${params.params.GUID}`, {
    method: 'PATCH',
  });
}
/**
 * 新增组织机构物流地址
 * */
export function postChangeAddress(params) {
  return fetchAPI('/ZZJGWLDZB', {
    method: 'POST',
    body: params.params
  });
}
/**
 * 查询某个组织机构的物流地址列表
 * */
export function getLogisticsAddressList(params) {
  return fetchAPI('/ZZJGWLDZB', {
    method: 'GET',
    body: params.params
  });
}
/**
 * 修改单个物流地址列表(设置默认收发货)
 * */
export function postEditLogiticAddress(params) {
  return fetchAPI(`/ZZJGWLDZB/${params.params.GUID}`, {
    method: 'PUT',
    body: params.params.params
  });
}
// 获取物流单详情列表
export function logisticsRecordDataAPI({ id, type }) {
  const body = { CRKDB: { FHZT: type } };
  return fetchAPI(`/DDB/${id}/WLDB`, {
    method: 'GET',
    body
  });
}

/**
 * 备货、铺货等入库——获取相应状态的物流单—订单列表
 * */
export function getReceiveProductuonListAPI(params) {
  return fetchAPI(`/WLDB/DDB/RK?Page=${params.params.page}&SortOrder=desc&PageSize=15&SortBy=`, {
    method: 'GET',
    body: params.params.dataParams
  });
}
/**
 * 获取第三方物流信息
 * */
export function getThirdLogisticsInfo(params) {
  return fetchAPI(`/WLDB/${params.params}/WLGSB/auto`, {
    method: 'GET'
  });
}
