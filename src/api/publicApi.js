import { fetchAPI } from 'lib/utils'

/**
 * 获取货币种类
 */
export function getCurrencyAPI() {
  return fetchAPI('/HBDMB', {
    method: 'GET'
  });
}

/**
 * 手术名称列表
 * @param  {string} {id}
 */
export function getOperateNameAPI({ id }) {
  return fetchAPI(`/CPLXB/${id}/SSMCB`, {
    method: 'GET'
  })
}

/**
 * 手术部位列表
 * @param  {string} {id} 业务线
 */
export function getOperatePartAPI({ id }) {
  return fetchAPI('/SSBWB', {
    method: 'GET',
    body: { SSLXB: { GUID: id } }
  })
}

/**
 * 手术入路列表
 * @param  {string} {id} 手术类型
 */
export function getOperateIntoRoadAPI({ id }) {
  return fetchAPI('/SSRLB', {
    method: 'GET',
    body: { SSLXB: { GUID: id } }
  })
}
