import { fetchAPI } from 'lib/utils'

// 配置信息查询

export function getPushServiceSettingDataAPI() {
  return fetchAPI('/XXPZB', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  });
}

export function updatePushServiceSettingDataAPI({ id, XXPZB }) {
  return fetchAPI(`/XXPZB/${id}`, {
    method: 'PATCH',
    body: {
      XXPZB
    }
  });
}
