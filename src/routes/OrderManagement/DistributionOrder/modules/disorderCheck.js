/**
 * Created by qyf on 2017/3/14.
 */
  /* 供应商*/
export const GET_DISTRIBUTION_ORGANIZATION = 'GET_DISTRIBUTION_ORGANIZATION';
export const GET_DISTRIBUTION_ORGANIZATION_SUCCESS = 'GET_DISTRIBUTION_ORGANIZATION _SUCCESS';
/* 收货地址*/
export const DISTRIBUTION_ADDRESS = 'DISTRIBUTION_ADDRESS';
export const DISTRIBUTION_ADDRESS_SUCCESS = 'DISTRIBUTION_ADDRESS_SUCCESS';
/* 合同查询*/
export const GET_DIS__BUTION__SEARCH_CONTRACTS = 'GET_DIS__BUTION__SEARCH_CONTRACTS';
export const GET_DIS__BUTION__SEARCH_CONTRACTS_SUCCESS = 'GET_DIS__BUTION__SEARCH_CONTRACTS_SUCCESS';
/* 提交订单*/
export const POST_DIS__BUTION__SUBMIT_DATA = 'POST_DIS__BUTION__SUBMIT_DATA';
export const POST_DIS__BUTION__SUBMIT_DATA_SUCCESS = 'POST_DIS__BUTION__SUBMIT_DATA_SUCCESS';
/* 合同id对应的业务线和品牌*/
export const GET_DIS__BUTION__CANTRACTS_DATA = 'GET_DIS__BUTION__CANTRACTS_DATA';
export const GET_DIS__BUTION__CANTRACTS_DATA_SUCCESS = 'GET_DIS__BUTION__CANTRACTS_DATA_SUCCESS';
/* 错误处理*/
export const GET_DISTRIBUTION__FAIL = 'ERROR';
export const FAIL_STORE = 'FAIL_STORE';


/* 供应商*/
export function getDistriButionOrganization(contract_type, id) {
  return {
    type: GET_DISTRIBUTION_ORGANIZATION,
    payload: { contract_type, authorized_organization_id: id }
  }
}
/* 收货地址*/
export function getDistriButionAddress(JXSID) {
  return {
    type: DISTRIBUTION_ADDRESS,
    payload: { JXSID, SFLX: 1 }
  }
}
/* 合同查询*/
export function getDisSearchContracts(contract_type, authorize, another_organization_id, valid, distribution) {
  return {
    type: GET_DIS__BUTION__SEARCH_CONTRACTS,
    payload: { contract_type, authorize, another_organization_id, valid, distribution }
  }
}
/* 通过id查询*/
export function getDisSearchContractsrGanization_id(id) {
  return {
    type: GET_DIS__BUTION__CANTRACTS_DATA,
    payload: id

  }
}
/* 订单提交*/
export function submitDistriButionOrder(params) {
  return {
    type: POST_DIS__BUTION__SUBMIT_DATA,
    payload: params
  }
}

export function failStore() {
  return {
    type: FAIL_STORE
  }
}

export const actions = {
  getDistriButionOrganization,
  getDistriButionAddress,
  getDisSearchContracts,
  submitDistriButionOrder,
  getDisSearchContractsrGanization_id,
  failStore
}
const initialState = {
  /* 供应商*/
  authorizeOrganizations: [],
  /* 收货地址*/
  distriButionAddress: [],
  /* 查询合同*/
  contractsList: [],
  /* 提交*/
  PHDDB: {},
  authorizations: []
}
const ACTION_HANDLERS = {
  [GET_DISTRIBUTION_ORGANIZATION]: (state, action) => state,
  [GET_DISTRIBUTION_ORGANIZATION_SUCCESS]: (state, action) => Object.assign({}, state, {
    authorizeOrganizations: action.response
  }),
  /* 收货地址*/
  [DISTRIBUTION_ADDRESS]: (state, action) => state,
  [DISTRIBUTION_ADDRESS_SUCCESS]: (state, action) => Object.assign({}, state, {
    distriButionAddress: action.response
  }),
  /* 合同查询*/
  [GET_DIS__BUTION__SEARCH_CONTRACTS]: (state, action) => state,
  [GET_DIS__BUTION__SEARCH_CONTRACTS_SUCCESS]: (state, action) => Object.assign({}, state, {
    contractsList: action.response
  }),
  /* 提交订单*/
  [POST_DIS__BUTION__SUBMIT_DATA]: (state, action) => state,
  [POST_DIS__BUTION__SUBMIT_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    PHDDB: action.response,
  }),
  /* 根据合同id查询业务线*/
  [GET_DIS__BUTION__CANTRACTS_DATA]: (state, action) => state,
  [GET_DIS__BUTION__CANTRACTS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    authorizations: action.response,
  }),
  [FAIL_STORE]: (state, action) => Object.assign({}, state, initialState),
  [GET_DISTRIBUTION__FAIL]: (state, action) => state

}


export default function distributionOrderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

