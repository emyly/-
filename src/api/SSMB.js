import { fetchAPI } from 'lib/utils'

/**
 * 手术模板关联商品详情查询
 * @param  {} {id}
 */
export function getProductionWithTemplateAPI({ id }) {
  return fetchAPI(`/SSMBB/${id}/SSMBSPGLB`, {
    method: 'GET'
  });
}

/**
 * 获取手术模板列表
 */
export function getTemplateListAPI(obj) {
  return fetchAPI('/SSMBB', {
    method: 'GET',
    body: {
      SSMBB: {
        ...obj
      }
    }
  });
}


export function deleteSingleTemplateAPI({ id }) {
  return fetchAPI(`/SSMBB/${id}`, {
    method: 'DELETE'
  });
}
