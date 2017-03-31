import { fetchAPI } from 'lib/utils'

/**
 * 查询折扣详情
 * */
export function getDiscountDetailAPI(params) {
  return fetchAPI(`/DDB/${params.id}/ZKMX`, {
    method: 'GET',
  });
}
