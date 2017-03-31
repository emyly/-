import { fetchAPI, fetchRA } from 'lib/utils'
import _ from 'lodash'
import qs from 'qs'

export function testAPI() {
  return fetchAPI('/111', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'GET'
  })
}

function constructSubURI({
  contractType,
  authorizeOrgId,
  authorizedOrgId,
  businessLineId,
  brandId,
  firstClassId,
  secondClassId,
  thirdClassId,
  forPricing = '',
  pricingStatus = '',
  priceStatus = '',
  moneyType = '',
  minPrice = -1,
  maxPrice = -1
}) {
  const contract = _.isNil(contractType) || contractType === ''
    ? '' : `${qs.stringify({ contract_type: contractType })}&`

  const authorizeOrg = _.isNil(authorizeOrgId) || authorizeOrgId === ''
    ? '' : `${qs.stringify({ authorize_organization_id: authorizeOrgId })}&`

  const authorizedOrg = _.isNil(authorizedOrgId) || authorizedOrgId === ''
    ? '' : `${qs.stringify({ authorized_organization_id: authorizedOrgId })}&`

  const businessLine = _.isNil(businessLineId) || businessLineId === ''
    ? '' : `${qs.stringify({ business_line_id: businessLineId })}&`

  const brand = _.isNil(brandId) || brandId === ''
    ? '' : `${qs.stringify({ brand_id: brandId })}&`

  const firstClass = _.isNil(firstClassId) || firstClassId === ''
    ? '' : `${qs.stringify({ first_class_id: firstClassId })}&`

  const secondClass = _.isNil(secondClassId) || secondClassId === ''
    ? '' : `${qs.stringify({ second_class_id: secondClassId })}&`

  const thirdClass = _.isNil(thirdClassId) || thirdClassId === ''
    ? '' : `${qs.stringify({ third_class_id: thirdClassId })}&`

  const for_pricing = _.isNil(forPricing) || forPricing === ''
    ? '' : `${qs.stringify({ for_pricing: forPricing })}&`;

  const pricing_status = _.isNil(pricingStatus) || pricingStatus === ''
    ? '' : `${qs.stringify({ pricing_status: pricingStatus })}&`

  const price_status = _.isNil(priceStatus) || priceStatus === ''
    ? '' : `${qs.stringify({ price_status: priceStatus })}&`

  const money_type = _.isNil(moneyType) || moneyType === ''
    ? '' : `${qs.stringify({ money_type: moneyType })}&`

  const min_price = minPrice === -1 ? '' : `${qs.stringify({ min_price: minPrice })}&`

  const max_price = maxPrice === -1 ? '' : qs.stringify({ max_price: maxPrice })

  return `${contract}${authorizeOrg}${authorizedOrg}${businessLine}${brand}${firstClass}${secondClass}${thirdClass}${for_pricing}${pricing_status}${price_status}${money_type}${min_price}${max_price}`
}

// 经销商获取能选择的业务线

export function getLOBAPI(argObj) {
  return fetchRA(`/authorization/business_lines?${constructSubURI(argObj)}`, {
    method: 'GET'
  })
}

// 经销商获取能选择的品牌

export function getBrandDataAPI(argObj) {
  // const subURI = constructSubURI(contractType, authorizeOrgId)
  return fetchRA(`/authorization/brands?${constructSubURI(argObj)}`, {
    method: 'GET',
  })
}

export function getFirstClassSelectionAPI(argObj) {
  return fetchRA(`/authorization/first_class?${constructSubURI(argObj)}`, {
    method: 'GET',
  })
}

export function getSecondClassSelectionAPI(argObj) {
  return fetchRA(`/authorization/second_class?${constructSubURI(argObj)}`, {
    method: 'GET',
  })
}

export function getThirdClassSelectionAPI(argObj) {
  return fetchRA(`/authorization/third_class?${constructSubURI(argObj)}`, {
    method: 'GET',
  })
}

export function getAuthorizationSelectionGoodsAPI(argObj) {
  return fetchRA(`/authorization/goods?${constructSubURI(argObj)}`, {
    method: 'GET',
  })
}

// 获取合同下的统计信息(已授权清单)
export function getCurrentContractAuthorizedSummaryAPI({ id }) {                    // 当前合同ID
  return fetchRA(`/contract/${id}/summary`, {
    method: 'GET',
  });
}

// 获取当前组织机构-所有合同下的统计信息(已获取的授权清单) 不需要传任何值,后期更改
export function getAllContractAuthorizedSummaryAPI({ id }) {                    // 当前合同ID
  return fetchRA(`/contract/${id}/summary`, {
    method: 'GET',
  });
}

/**
 * 根据授权经销商获取被授权经销商
 * @param  {string} contract_type
 * @param  {string} authorize_organization_id
 * @param  {string} authorized_organization_type
 */
export function getAuthorizedOrganizationAPI(params) {
  return fetchRA(`/contract/authorized_organizations?${qs.stringify(params)}`, {
    method: 'GET'
  });
}

/**
 * 根据被授权经销商获取授权经销商
 * @param  {string} contract_type
 * @param  {string} authorized_organization_id
 */
export function getAuthorizeOrganizationAPI(params) {
  return fetchRA(`/contract/authorize_organizations?${qs.stringify(params)}`, {
    method: 'GET'
  });
}

/**
 * 经销商获取能选择的类型
 * @param  {string} contract_type
 * @param  {string} business_line_id
 * @param  {string} brand_id
 * @param  {string} authorize_organization_id
 * @param  {string} authorized_organization_id
 * @param  {string} top_organization_id
 */
export function getAuthorizeTypesAPI(params) {
  return fetchRA(`/authorization/types?${qs.stringify(params)}`, {
    method: 'GET'
  })
}

/**
 * 经销商获取能选择的模板
 * @param  {string} contract_type
 * @param  {string} business_line_id
 * @param  {string} type_id
 * @param  {string} authorize_organization_id
 * @param  {string} authorized_organization_id
 * @param  {string} top_organization_id
 */
export function getAuthorizeTempletsAPI(params) {
  return fetchRA(`/authorization/templets?${qs.stringify(params)}`, {
    method: 'GET'
  })
}

/**
 * 查询授权合同
 * @param  {string} contract_type
 * @param  {string} authorize
 */
export function getContractsAPI(params) {
  return fetchRA(`/contracts?${qs.stringify(params)}`, {
    method: 'GET'
  })
}

/**
 * searchAuthorizedGoodsAPI
 *
 * @param  {object} params
 *   {
 *     "contract_type": "合同类型",
 *     "business_line_id": "业务线id",
 *     "brand_id": "品牌id",
 *     "authorize_organization_id": "授权经销商id",
 *     "authorized_organization_id": "被授权授权经销商id",
 *     "key": "搜索关键字"
 *   }
 * @return {object}
 */
export function searchAuthorizedGoodsAPI(params) {
  return fetchRA(`/authorization/goods/s?${qs.stringify(params, { skipNulls: true })}`, {
    method: 'GET',
  })
}

/**
 * 查询合同类型
 * @param  {} params
 */
export function searchContractsAPI(params) {
  return fetchRA(`/contracts?${qs.stringify(params, { skipNulls: true })}`, {
    method: 'GET',
  })
}

export function getContractAuthorizationsAPI(id) {
  return fetchRA(`/contract/${id}/authorizations`, {
    method: 'GET',
  })
}
