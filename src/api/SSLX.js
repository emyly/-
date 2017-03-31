import { fetchAPI } from 'lib/utils'

/**
 * 手术类型关联商品详情查询
 * @param  {} {id}
 */
export function getProductionWithTypeAPI({ id }) {
  return fetchAPI(`/SSLXB/${id}/SSLXSPGLB`, {
    method: 'GET'
  });
}
