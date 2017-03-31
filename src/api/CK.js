import { fetchAPI } from 'lib/utils'

// 查询单个仓库的子仓库列表

export function getWarehouseAPI({ id }) {
  return fetchAPI(`/CKB/${id}/CKB`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  });
}
// 查询单个仓库基本信息
export function getSingleWarehouInfo(params) {
  return fetchAPI(`/CKB/${params.params.CKID}`, {
    method: 'GET'
  })
}
// 查询单个仓库的库位列表
export function getLocationAPI({ id }) {
  return fetchAPI(`/CKB/${id}/KWB`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  })
}
// 查询单个库位存放的商品列表
export function getSingleLocationStorageProductionData(params) {
  return fetchAPI(`/KWB/${params.params.params.KWID}/SPCCB?Page=${params.params.page}&SortOrder=desc&PageSize=15&SortBy=`, {
    method: 'GET',
    body: params.params.params.body
  })
}
// 查询单个库位信息
export function getSingleLocationStorageData(params) {
  return fetchAPI(`/KWB/${params.params.KWID}`, {
    method: 'GET',
    body: params.params
  })
}
// 修改单个仓库信息
export function editSingleWarehouseInfo(params) {
  return fetchAPI(`/CKB/${params.params.CKID}`, {
    method: 'PUT',
    body: params.params
  })
}
// 修改库位信息
export function editSingleLocationStorageInfo(params) {
  return fetchAPI(`/KWB/${params.params.KWID}`, {
    method: 'PUT',
    body: params.params
  })
}
// 新建仓库
export function createNewWarehouse(params) {
  return fetchAPI('/CKB', {
    method: 'POST',
    body: params.params
  })
}
// 新建库位
export function createNewLocactionStorage(params) {
  return fetchAPI('/KWB', {
    method: 'POST',
    body: params.params
  })
}
// 禁用/启用仓库
export function forbidAndUserSingleWarehouse(params) {
  return fetchAPI(`/${params.params.CKKW}/${params.params.CKID}`, {
    method: 'PATCH',
    body: params.params.body
  })
}
// 查询单个库位的子库位列表
export function getChildLocationAPI({ id }) {
  return fetchAPI(`/KWB/${id}/KWB`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  })
}

// 查看单个库位下相应商品
export function getLocationGoodsAPI({ id, page }) {
  return fetchAPI(`/KWB/${id}/SPCCB?Page=${page}&SortOrder=desc&PageSize=5&SortBy=`, {                 // 后期PageSize去掉，做分页获取数据
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  })
}

// 查看单个库位下相应商品--分页
export function getLocationGoodsPageAPI([id, page, params]) {
  return fetchAPI(`/KWB/${id}/SPCCB?PageSize=5&Page=${page}&SortBy=default&SortOrder=desc`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET',
    body: params
  })
}

/* 根据筛选条件查询商品的存储信息*/

export function getInventorySeeData([page, params]) {
  return fetchAPI(`/SPCCB?PageSize=10&Page=${page}&SortBy=default&SortOrder=desc`, {
    method: 'GET',
    body: params
  })
}

/* 仓库的缺货清单*/

export function getWarehouseOutStockGoodsDataAPI({ ddid, ckid }) {
  return fetchAPI(`/DDB/${ddid}/CKB/${ckid}/SPCCB`, {
    method: 'GET'
  })
}

/**
 * 创建商品转移记录
 */
export function postProductionTranAPI(CRKMXB) {
  return fetchAPI('/DDB/CRKDB/CRKMXB/SPZY', {
    method: 'POST',
    body: { CRKMXB }
  })
}

export function getTransGoodsAPI({ CKID, KWID, SPTM }) {
  return fetchAPI('/CKB/KWB/SPCCB/SPZY', {
    method: 'GET',
    body: { CKID, KWID, SPTM }
  })
}

