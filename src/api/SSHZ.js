import { fetchAPI } from 'lib/utils'

// 订单坏账明细查询

export function getBaddebtsDetailAPI({ id }) {
  return fetchAPI(`/DDB/${id}/HZMX`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  });
}
