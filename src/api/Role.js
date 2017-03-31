/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 2016/11/25.
 */
import { fetchAPI } from 'lib/utils'
import _ from 'lodash'

/**
 * 获取角色列表
 * @export
 * @param {any} userId
 * @returns
 */
export function getRoleAPI(userId) {
  let body;
  if (!_.isNil(userId)) {
    body = {
      YHB: {
        GUID: userId
      }
    }
  }
  return fetchAPI('/JSQX?PageSize=10000', {
    method: 'GET',
    body
  });
}

/**
 * 获取权限列表
 * @export
 * @param {any} jsId
 * @returns
 */
export function getAuthorityAPI(jsId) {
  let body;
  if (!_.isNil(jsId)) {
    body = {
      JSB: {
        GUID: jsId
      }
    }
  }
  return fetchAPI('/MKFLB', {
    method: 'GET',
    body
  });
}
export function editRoleListAPI({ jsId, Id }) {
  const body = {
    MKYWID: Id
  };
  return fetchAPI(`/JSYWFLB/${jsId}`, {
    method: 'PUT',
    body
  });
}
