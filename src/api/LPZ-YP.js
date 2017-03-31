/**
 * Created by liuyali on 2017/1/4.
 */
import { fetchAPI } from 'lib/utils'
/*
* 查询单个订单对应的发票及商品明细
* */
export function getOrderGoodsDetailAndBillsAPI([ddid, params]) {
  let body = '';
  if (params) {
    body = params;
  }
  return fetchAPI(`/CRKDB/${ddid}/CRKMXB/FPMXB`, {
    method: 'GET',
    body
  })
}
