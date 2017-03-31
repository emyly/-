import { fetchAPI } from 'lib/utils'

// 订单加急明细查询

export function getUrgentDetailAPI({ id }) {
  return fetchAPI(`/DDB/${id}/JJMX`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  });
}
