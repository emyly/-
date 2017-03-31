import { fetchAPI } from 'lib/utils'

/**
 * 发送短信
 * @param  {} params
 */
export function postDXAPI({ FSR, JSSJH }) {
  return fetchAPI('/DXB', {
    method: 'POST',
    body: { DXB: { FSR, JSSJH } }
  })
}
