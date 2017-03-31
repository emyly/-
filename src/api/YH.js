/**
 * Created by liuyali on 2016/11/4.
 */
import { fetchAPI } from 'lib/utils'

// 用户查询
export function getPersonalBasicInfoAPI({ id }) {
  return fetchAPI(`/YHB/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
  })
}

// 用户修改

export function putPersonalBasicInfoAPI({ id, userInfo }) {
  return fetchAPI(`/YHB/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'PUT',
    body: { YHB: userInfo }
  })
}

/* 用户退出*/
export function exitAPI() {
  return fetchAPI('/YHYYCXZTB', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'DELETE',
  })
}
/*
* 更多模块
* */

export function getUserMenuBarAPI(yhid) {
  return fetchAPI(`/YHB/${yhid}/MKYWB`, {
    method: 'GET'
  });
}
