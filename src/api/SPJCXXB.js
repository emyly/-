import { fetchAPI } from 'lib/utils'

/**
 * 商品基础信息批量查询
 * @param  {string} MRJXSID
 * @param  {string} MCJXSID
 * @param  {string} DDLX
 * @param  {array} ID
 */
export function getProductionListAPI({ MRJXSID, MCJXSID, DDLX, ID }) {
  return fetchAPI('/SPJCXXB', {
    method: 'GET',
    body: { SPJCXXB: { MRJXSID, MCJXSID, DDLX, ID } }
  });
}
