import { fetchAPI } from 'lib/utils'
/**
 * fetchEmployeeListAPI - description
 *
 * const URL = '/ZZJGB/:id/YHB'
 * Document: https://git.oschina.net/firstgrid/FirstGrid_Saas/blob/develop/document/组织机构.md
 * 通过组织机构ID获取员工列表
 *
 */
export function fetchEmployeeListAPI({ orgId, page }) {
  return fetchAPI(`/ZZJGB/${orgId}/YHB?Page=${page}&SortOrder=desc&PageSize=15`, { method: 'GET' })
}

// 用户修改：/YHB/:id
export function editEmployeeInfoAPI({ id, YHB }) {
  const body = JSON.stringify({
    YHB: {
      SJHM: YHB.SJHM, // 手机号码
      YHXM: YHB.YHXM, // 创建人
      MM: YHB.MM, //密码
    }
  });
  return fetchAPI(`/YHB/${id}`,
    {
      method: 'PUT',
      body
    }
    )
}
// 添加员工/YHB/:sjhm
export function createEmployeeAPI(YHB) {
  const body = JSON.stringify({
    YHB: {
      SJHM: YHB.SJHM, // 手机号码
      YHXM: YHB.YHXM, // 创建人
      MM: YHB.MM, // 密码
      YHLY: 0, // 类型
      SSBM: 0, // 部门
    }
  });
  return fetchAPI(`/YHB/${YHB.SJHM}`,
    {
      method: 'POST',
      body
    }
  )
}
// 员工离职/YHB/:id
export function deleteEmployeeAPI(id) {
  return fetchAPI(`/YHB/${id}`,
    {
      method: 'DELETE'
    }
  )
}

// 员工角色设置/YHB/:id
export function employeeRoleEditInfoAPI({ yhId, jsId }) {
  const body = {
    YHJSGLB: {
      YHID: yhId, // 用户id
      JSIDS: jsId, //角色id
    }
  };
  return fetchAPI('/YHJSGL',
    {
      method: 'PUT',
      body
    }
  )
}

/**
 * 用户登录
 * @param  {} SJHM 手机号码
 * @param  {} MM   密码或短信验证码
 */
export function userLoginAPI({ SJHM, MM }) {
  return fetchAPI('/YHYYCXZTB', {
    method: 'POST',
    body: { YHB: { SJHM, MM } }
  });
}

/**
 * 找回密码,重置密码
 * @param  {} SJHM 手机号码
 * @param  {} MM   密码或短信验证码
 */
export function userRestPWAPI({ SJHM, MM, YZM }) {
  return fetchAPI(`/YHB/SJHM/${SJHM}`, {
    method: 'PATCH',
    body: { YHB: { SJHM, MM }, YHYZMB: { YZM } }
  });
}
