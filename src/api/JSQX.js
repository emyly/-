/**
 * Created by sjf on 2016/11/5.
 */
import { fetchAPI } from 'lib/utils'

// 所有角色明细查询
export function getRoleAPI({ id, type, page }) {
  const body = { JSB: { SSZZJGID: id } };
  return fetchAPI(`/JSQX?Page=${page}&SortOrder=desc&PageSize=15`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
    body
  });
}
// 创建角色
export function creatRoleAPI({ name }) {
  const body = { JSB: { JSMC: name } };
  return fetchAPI('/JSQX', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'POST',
    body
  });
}
// 创建角色业务模块
export function creatBusinessRoleAPI(obj) {
  const body = { MKYWID: obj.MKYWID };
  return fetchAPI(`/JSYWFLB/${obj.JSID}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'PUT',
    body
  });
}

// 修改(禁用)角色权限
export function roleSetAPI({ Id, type }) {
  const body = { JSB: { ZTBS: type } };
  return fetchAPI(`/JS/${Id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'PATCH',
    body
  });
}
// 修改角色名称
export function roleNameSetAPI({ id, jsmc }) {
  const body = { JSB: { JSMC: jsmc } };
  return fetchAPI(`/JS/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'PUT',
    body
  });
}

