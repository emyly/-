
import { fetchAPI } from 'lib/utils';

/**
 * 商品价格定价(单个/批量)
 */
export function putGoodsMakePriceAddData(makePriceGoodsCreateArray) {
  return fetchAPI('/SPJGB', {
    method: 'POST',
    body: {
      SPJGB: makePriceGoodsCreateArray  // 创建定价Array
    }
  });
}

/**
 * 删除单条商品价格
 */
export function deleteSingleGoodsMakePriceData({ id }) {
  return fetchAPI(`/SPJGB/${id}`, {
    method: 'DELETE'
  });
}


/**
 * 查询一个商品的价格列表(正生效/已失效/未生效)
 */
export function getSingleGoodsMakePriceData({ id, MCJXSID, MRJXSID, JGZT }) {
  return fetchAPI(`/JG/SP/${id}`, {
    method: 'GET',
    body: {
      MCJXSID,
      MRJXSID,
      JGZT
    }
  });
}
