/**
 * Created by SJF on 2016/11/21.
 */
import { fetchAPI } from 'lib/utils'
// 查询平台所有的业务模块(即权限),或指定角色所拥有的业务模块
// /MKFLB
export function fecthRolelistAPI(id) {
  let body;
  if (id)body = JSON.stringify({ JSB: { GUID: id } });
  else body = '';
  return fetchAPI('/MKFLB', {
    method: 'GET',
    body
  })
}
