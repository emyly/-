import { fetchAPI, fetchRA, fetchFS } from 'lib/utils'

// 获取与本企业相关联所有机构
export function getPartnerAPI({ id, type }) {
  let body;
  if (type !== 'J' && type !== 'Y') body = '';
  else body = { ZZJGB: { JGLX: type } };
  return fetchAPI(`/ZZJGB/${id}/JXSGXB`, {
    method: 'GET',
    body
  });
}
/* 获取组织机构ID获取员工列表*/
export function atSelectAPI({ organizationId }) {
  return fetchAPI(`/ZZJGB/${organizationId}/BMYHB`, {
    method: 'GET'
  });
}

/* 机构认证*/
export function orgAuthAPI(obj) {
  return fetchAPI('/ZZJGZJB', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'POST',
    body: { WDB: obj }
  });
}

/* 机构创建*/
export function createOrgAPI(JGMC) {
  return fetchAPI('/ZZJGB', {
    method: 'POST',
    body: { ZZJGB: { JGMC } }
  });
}

/* 添加合作企业*/
export function addCooperatorAPI({ JXSID, GLJXSID, SXJ }) {
  return fetchAPI('/JXSGXB', {
    method: 'POST',
    body: { JXSGXB: { JXSID, GLJXSID, SXJ } }
  });
}


/* 查询机构审核进度*/
export function getFirstBusinessRegistrationListAPI(id) {
  return fetchAPI(`/ZZJGB/${id}/audit`, {
    method: 'GET',
  });
}

/* 获取与本企业相关联所有机构*/
export function getRelatedOrgAPI({ page, id }) {
  return fetchAPI(`/ZZJGB/${id}/JXSGXB?PageSize=10&Page=${page}`, {
    method: 'GET',
  });
}
/* 获取与本企业相关联所有机构 -- 不分页*/
export function getRelatedOrgNoPageAPI([id, params]) {
  return fetchAPI(`/ZZJGB/${id}/JXSGXB`, {
    method: 'GET',
    body: params
  });
}
/* 获取机构信息*/
export function getOrgDetail(id) {
  return fetchAPI(`/ZZJGB/${id}`, {
    method: 'GET',
  });
}

/* 通过组织机构ID获取证件列表*/
export function getCertificateListAPI(id) {
  return fetchAPI(`/ZZJGB/${id}/ZZJGZJB`, {
    method: 'GET',
  });
}

/**
 * 通过组织机构ID获取员工列表
 * @param  {string} {id}
 */
export function getStaffListAPI({ id }) {
  return fetchAPI(`/ZZJGB/${id}/YHB`, {
    method: 'GET',
  });
}
/**
 * 通过组织机构ID获取企业信息
 * @param  {string} {id}
 */
export function getEnterpriseInformationAPI({ id }) {
  return fetchRA(`/organization/${id}`, {
    method: 'GET',
  });
}

/* 机构信息更新*/
export function putCorporationBasicInfoAPI({ id, body }) {
  return fetchAPI(`/ZZJGB/${id}`, {
    method: 'PATCH',
    body
  });
}
