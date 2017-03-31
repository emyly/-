/**
 * Created by NXQ on 11/4/2016.
 */
import { fetchAPI } from 'lib/utils';

/**
 * 获取我授信的公司列表
 */
export function getCreditOrganizationListAPI({ id }) {
  return fetchAPI(`/JXSXYB/${id}/BSQ`, {
    method: 'GET'
  });
}

/**
 * 获取授信于我的公司列表
 */
export function getCreditOrganizationToMeListAPI({ id }) {
  return fetchAPI(`/JXSXYB/${id}/SQ`, {
    method: 'GET'
  });
}

/**
 * 经销商信用查询
 */
export function getCreditDetailAPI({ AuthorizeOrganizationId, AuthorizedOrganizationId }) {
  return fetchAPI('/JXSXYB', {
    method: 'GET',
    body: {
      JXSXYB: {
        SQJXSID: AuthorizeOrganizationId,   // 授权经销商ID
        BSQJXSID: AuthorizedOrganizationId // 被授权经销商ID（组织机构ID）
      }
    }
  });
}

/**
 * 经销商临时信用明细查询
 */
export function getTempCreditDetailAPI({ AuthorizeOrganizationId, AuthorizedOrganizationId }) {
  return fetchAPI('/JXSXYMXB', {
    method: 'GET',
    body: {
      JXSXYMXB: {
        SQJXSID: AuthorizeOrganizationId,   // 授权经销商ID
        BSQJXSID: AuthorizedOrganizationId, // 被授权经销商ID（组织机构ID）
        EDLX: '0'                          // 额度类型0表示临时信用
      }
    }
  });
}

/**
 * 经销商长期信用明细查询
 */
export function getFixedCreditDetailAPI({ AuthorizeOrganizationId, AuthorizedOrganizationId }) {
  return fetchAPI('/JXSXYMXB', {
    method: 'GET',
    body: {
      JXSXYMXB: {
        SQJXSID: AuthorizeOrganizationId,   // 授权经销商ID
        BSQJXSID: AuthorizedOrganizationId, // 被授权经销商ID（组织机构ID）
        EDLX: { ne: '0' }                    // 额度类型不等于0表示长期信用
      }
    }
  });
}

/**
 * 单条经销商信用明细删除
 */
export function deleteSingleTempCreditAPI(deleteObject) {
  return fetchAPI(`/JXSXYMXB/${deleteObject.GUID}`, {
    method: 'DELETE'
  });
}

/**
 * 经销商信用明细有效期查询
 */
export function getCreditDetailValidDateAPI({ AuthorizeOrganizationId, AuthorizedOrganizationId }) {
  return fetchAPI('/JXSXYMXYXQ', {
    method: 'GET',
    body: {
      JXSXYMXB: {
        SQJXSID: AuthorizeOrganizationId,   // 授权经销商ID
        BSQJXSID: AuthorizedOrganizationId // 被授权经销商ID（组织机构ID）
      }
    }
  });
}

/**
 * 创建经销商信用
 */
export function createSingleCreditAPI(createObject) {
  return fetchAPI('/JXSXYMXB', {
    method: 'POST',
    body: {
      JXSXYMXB: createObject
    }
  });
}
