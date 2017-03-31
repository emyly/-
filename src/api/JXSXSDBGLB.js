/**
 * Created by sjf on 2016/11/16.
 */
import { fetchAPI } from 'lib/utils'


// 获取关联经销商下的销售代表和销售助理列表
// https://git.oschina.net/firstgrid/FirstGrid_Saas/blob/develop/document/销售代表关联/JXSXSDBGLB/:id
export function fecthSalelistAPI({ orgId, type, page }) {
  let body;
  body = { JXSXSRYGLB: { JXSID: orgId, XSRYLX: type } };
  return fetchAPI(`/JXSXSDBGLB/XSRYAll?Page=${page}&SortOrder=desc&PageSize=15`, {
    method: 'GET',
    body
  })
}


// 销售代表的创建
export function CreatListAPI({ orgId, orderId, type }) {
  let body;
  body = { JXSXSRYGLB: { GLJXSID: orgId, XSRYID: orderId, XSRYLX: type } };
  return fetchAPI('/JXSXSDBGLB', {
    method: 'POST',
    body
  })
}

// 销售代表的编辑
export function EditListAPI({ orgId, id, type }) {
  let body;
  body = { JXSXSRYGLB: { GLJXSID: orgId, XSRYID: id, XSRYLX: type } };
  return fetchAPI('/JXSXSDBGLB', {
    method: 'PUT',
    body
  })
}

/**
 * 经销商和关联经销商对应的销售人员
 * @param  {string} JXSID
 * @param  {string} GLJXSID
 * @param  {string} XSRYLX
 */
export function getSaleListAPI({ JXSID, GLJXSID, XSRYLX }) {
  return fetchAPI('/JXSXSDBGLB/XSRY', {
    method: 'GET',
    body: { JXSXSRYGLB: { JXSID, GLJXSID, XSRYLX } }
  })
}
