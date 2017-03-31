/**
 * Created by 123 on 11/15/2016.
 */

import { fetchRA } from 'lib/utils'

// 获取合作伙伴签约详情(已签约)
export function getPartnerSummaryAPI({ id }) {                    // 当前组织结构ID
  return fetchRA(`/authorize_organization/${id}/partner/summary`, {
    method: 'GET',
  });
}


// 创建合同
export function createContract(createObj) {
  return fetchRA('/contract', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createObj)
  });
}
