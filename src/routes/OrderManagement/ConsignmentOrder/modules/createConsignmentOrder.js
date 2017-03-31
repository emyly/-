// ------------------------------------
// Constants
// ------------------------------------
export const GET_AUTHORIZE_ORGANIZATION = 'createConsignmentOrder_GET_AUTHORIZE_ORGANIZATION'
export const GET_AUTHORIZE_ORGANIZATION_SUCCESS = 'createConsignmentOrder_GET_AUTHORIZE_ORGANIZATION_SUCCESS'
export const GET_RECEIVE_ADDRESS = 'createConsignmentOrder_GET_RECEIVE_ADDRESS'
export const GET_RECEIVE_ADDRESS_SUCCESS = 'createConsignmentOrder_GET_RECEIVE_ADDRESS_SUCCESS'
export const POST_STOCK_ORDER = 'createConsignmentOrder_POST_STOCK_ORDER'
export const POST_STOCK_ORDER_SUCCESS = 'createConsignmentOrder_POST_STOCK_ORDER_SUCCESS'
export const GET_PRODUCTION_LIST = 'createConsignmentOrder_GET_PRODUCTION_LIST'
export const GET_PRODUCTION_LIST_SUCCESS = 'createConsignmentOrder_GET_PRODUCTION_LIST_SUCCESS'
export const STOCK_ORDER_ERROR = 'ERROR'
export const INIT_STORE = 'createConsignmentOrder_INIT_STORE'


// ------------------------------------
// Actions
// ------------------------------------
export function getProductionList(hospital, organizationId, productionList) {
  return {
    type: GET_PRODUCTION_LIST,
    payload: {
      MRJXSID: hospital,
      MCJXSID: organizationId,
      DDLX: 5,
      ID: productionList
    }
  }
}


export function submitStockOrder(params) {
  console.log('submitStockOrder')
  return {
    type: POST_STOCK_ORDER,
    payload: params
  }
}

export function getAuthorizeOrganization(contract_type, id) {
  return {
    type: GET_AUTHORIZE_ORGANIZATION,
    payload: { contract_type, authorized_organization_id: id }
  }
}

export function getReceiveAddress(JXSID) {
  return {
    type: GET_RECEIVE_ADDRESS,
    payload: { JXSID, SFLX: 1 }
  }
}

export function initStore() {
  return {
    type: INIT_STORE
  }
}

export const actions = {
  getAuthorizeOrganization,
  getReceiveAddress,
  submitStockOrder,
  initStore,
  getProductionList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_AUTHORIZE_ORGANIZATION]: (state, action) => state,
  [GET_AUTHORIZE_ORGANIZATION_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      authorizeOrganization: action.response
    })
  },
  [GET_RECEIVE_ADDRESS]: (state, action) => state,
  [GET_RECEIVE_ADDRESS_SUCCESS]: (state, action) => Object.assign({}, state, {
    receiveAddress: action.response
  }),
  [POST_STOCK_ORDER]: (state, action) => state,
  [POST_STOCK_ORDER_SUCCESS]: (state, action) => Object.assign({}, state, {
    DDB: action.response,
  }),
  [GET_PRODUCTION_LIST]: (state, action) => state,
  [GET_PRODUCTION_LIST_SUCCESS]: (state, action) => Object.assign({}, state, {
    productionList: action.response,
  }),
  [INIT_STORE]: (state, action) => Object.assign({}, state, initialState),
  [STOCK_ORDER_ERROR]: (state, action) => state,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  authorizeOrganization: [],
  contracts: [],
  types: [],
  operateName: [],
  templets: [],
  operatePart: [],
  operateIntoRoad: [],
  receiveAddress: [],
  productionList: [],
  saleManage: [],
  saleAssistant: [],
  doctorList: [],
  DDB: {}
}

export default function gggg(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
