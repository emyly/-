// ------------------------------------
// Constants
// ------------------------------------
export const GET_AUTHORIZED_ORGANIZATION = 'createSurgeryOrder_GET_AUTHORIZED_ORGANIZATION'
export const GET_AUTHORIZED_ORGANIZATION_SUCCESS = 'createSurgeryOrder_GET_AUTHORIZED_ORGANIZATION_SUCCESS'
export const GET_AUTHORIZE_TYPES = 'createSurgeryOrder_GET_AUTHORIZE_TYPES'
export const GET_AUTHORIZE_TYPES_SUCCESS = 'createSurgeryOrder_GET_AUTHORIZE_TYPES_SUCCESS'
export const GET_OPERATE_NAME = 'createSurgeryOrder_GET_OPERATE_NAME'
export const GET_OPERATE_NAME_SUCCESS = 'createSurgeryOrder_GET_OPERATE_NAME_SUCCESS'
export const GET_OPERATE_TEMPLETS = 'createSurgeryOrder_GET_OPERATE_TEMPLETS'
export const GET_OPERATE_TEMPLETS_SUCCESS = 'createSurgeryOrder_GET_OPERATE_TEMPLETS_SUCCESS'
export const GET_OPERATE_PART = 'createSurgeryOrder_GET_OPERATE_PART'
export const GET_OPERATE_PART_SUCCESS = 'createSurgeryOrder_GET_OPERATE_PART_SUCCESS'
export const GET_OPERATE_INTOROAD = 'createSurgeryOrder_GET_OPERATE_INTOROAD'
export const GET_OPERATE_INTOROAD_SUCCESS = 'createSurgeryOrder_GET_OPERATE_INTOROAD_SUCCESS'
export const GET_RECEIVE_ADDRESS = 'createSurgeryOrder_GET_RECEIVE_ADDRESS'
export const GET_RECEIVE_ADDRESS_SUCCESS = 'createSurgeryOrder_GET_RECEIVE_ADDRESS_SUCCESS'
export const GET_SALE_LIST = 'createSurgeryOrder_GET_SALE_LIST'
export const GET_SALE_LIST_SUCCESS = 'createSurgeryOrder_GET_SALE_LIST_SUCCESS'
export const GET_DOCTOR_LIST = 'createSurgeryOrder_GET_DOCTOR_LIST'
export const GET_DOCTOR_LIST_SUCCESS = 'createSurgeryOrder_GET_DOCTOR_LIST_SUCCESS'
export const POST_SURGERY_ORDER = 'createSurgeryOrder_POST_SURGERY_ORDER'
export const POST_SURGERY_ORDER_SUCCESS = 'createSurgeryOrder_POST_SURGERY_ORDER_SUCCESS'
export const GET_PRODUCTION_LIST = 'createSurgeryOrder_GET_PRODUCTION_LIST'
export const GET_PRODUCTION_LIST_SUCCESS = 'createSurgeryOrder_GET_PRODUCTION_LIST_SUCCESS'
export const GET_DISTRIBUTION = 'createSurgeryOrder_GET_DISTRIBUTION'
export const GET_DISTRIBUTION_SUCCESS = 'createSurgeryOrder_GET_DISTRIBUTION_SUCCESS'
export const INIT_STORE = 'createSurgeryOrder_INIT_STORE'
export const SURGERY_ORDER_ERROR = 'ERROR'
export const INIT_STORE_CREATE_ORDER_TYPES = 'createSurgeryOrder_INIT_STORE_CREATE_ORDER_TYPES'
export const INIT_STORE_CREATE_ORDER_TEMPLETS = 'createSurgeryOrder_INIT_STORE_CREATE_ORDER_TEMPLETS'
export const INIT_STORE_CREATE_ORDER_TYPES_PRODUCTION_LIST = 'createSurgeryOrder_INIT_STORE_CREATE_ORDER_TYPES_PRODUCTION_LIST'
export const INIT_STORE_CREATE_ORDER_TEMPLETS_PRODUCTION_LIST = 'createSurgeryOrder_INIT_STORE_CREATE_ORDER_TEMPLETS_PRODUCTION_LIST'
export const INIT_STORE_CREATE_ORDER_OPERATE_OTHER_ATTR = 'createSurgeryOrder_INIT_STORE_CREATE_ORDER_OPERATE_OTHER_ATTR'
export const INIT_STORE_CREATE_ORDER_AUTHORIZE_ORGANIZATION = 'createSurgeryOrder_INIT_STORE_CREATE_ORDER_AUTHORIZE_ORGANIZATION'

// ------------------------------------
// Actions
// ------------------------------------
export function getProductionList(hospital, organizationId, productionList, typeId) {
  return {
    type: GET_PRODUCTION_LIST,
    payload: {
      MRJXSID: hospital,
      MCJXSID: organizationId,
      DDLX: 2,
      ID: productionList,
      typeId
    }
  }
}


export function submitSurgeryOrder(params) {
  return {
    type: POST_SURGERY_ORDER,
    payload: params
  }
}

export function getAuthorizeOrganization(contract_type, id) {
  return {
    type: GET_AUTHORIZED_ORGANIZATION,
    payload: { contract_type, authorize_organization_id: id, authorized_organization_type: 'Y' }
  }
}

export function getAuthorizeTypes(contract_type, business_line_id, brand_id,
                                    authorize_organization_id, authorized_organization_id, top_organization_id) {
  return {
    type: GET_AUTHORIZE_TYPES,
    payload: { contract_type, business_line_id, brand_id, authorize_organization_id, authorized_organization_id, top_organization_id }
  }
}

export function getOperateName(id) {
  return {
    type: GET_OPERATE_NAME,
    payload: { id }
  }
}

export function getOperateTemplets(contract_type, business_line_id, brand_id, type_id,
                                      authorize_organization_id, authorized_organization_id, top_organization_id) {
  return {
    type: GET_OPERATE_TEMPLETS,
    payload: { contract_type, business_line_id, brand_id, type_id, authorize_organization_id, authorized_organization_id, top_organization_id }
  }
}

export function getOperatePart(id) {
  return {
    type: GET_OPERATE_PART,
    payload: { id }
  }
}

export function getOperateIntoRoad(id) {
  return {
    type: GET_OPERATE_INTOROAD,
    payload: { id }
  }
}

export function getReceiveAddress(JXSID) {
  return {
    type: GET_RECEIVE_ADDRESS,
    payload: { JXSID, SFLX: 1 }
  }
}

export function getSaleList(organizationId, hospital) {
  return {
    type: GET_SALE_LIST,
    payload: { JXSID: organizationId, GLJXSID: hospital }
  }
}

export function getDoctorList(hospital) {
  return {
    type: GET_DOCTOR_LIST,
    payload: { organizationId: hospital }
  }
}

export function initStore() {
  return {
    type: INIT_STORE
  }
}

export function getDistribution(contract_type, id) {
  return {
    type: GET_DISTRIBUTION,
    payload: { contract_type, authorize_organization_id: id, authorized_organization_type: 'J' }
  }
}

export function initStoreCreateOrderTypes(initType = true) {
  if (initType) {
    return {
      type: INIT_STORE_CREATE_ORDER_TYPES
    }
  } else {
    return {
      type: INIT_STORE_CREATE_ORDER_TYPES_PRODUCTION_LIST
    }
  }
}

export function initStoreCreateOrderTemplets(initType = true) {
  if (initType) {
    return {
      type: INIT_STORE_CREATE_ORDER_TEMPLETS
    }
  } else {
    return {
      type: INIT_STORE_CREATE_ORDER_TEMPLETS_PRODUCTION_LIST
    }
  }
}

export function initStoreCreateOrderOperateOtherAttr() {
  return {
    type: INIT_STORE_CREATE_ORDER_OPERATE_OTHER_ATTR
  }
}

export function initStoreCreateOrderAuthorizeOrganization() {
  return {
    type: INIT_STORE_CREATE_ORDER_AUTHORIZE_ORGANIZATION
  }
}


export const actions = {
  getAuthorizeOrganization,
  getAuthorizeTypes,
  getOperateName,
  getOperateTemplets,
  getOperatePart,
  getOperateIntoRoad,
  getReceiveAddress,
  getSaleList,
  getDoctorList,
  submitSurgeryOrder,
  initStore,
  getProductionList,
  getDistribution,
  initStoreCreateOrderTypes,
  initStoreCreateOrderTemplets,
  initStoreCreateOrderOperateOtherAttr,
  initStoreCreateOrderAuthorizeOrganization
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
  typeProductionList: [],
  templetsProductionList: [],
  saleManage: [],
  saleAssistant: [],
  doctorList: [],
  DDB: {},
  distributions: [],
  typeId: null
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_AUTHORIZED_ORGANIZATION]: (state, action) => state,
  [GET_AUTHORIZED_ORGANIZATION_SUCCESS]: (state, action) => Object.assign({}, state, {
    authorizeOrganization: action.response.authorizeOrganization,
    contracts: action.response.contracts
  }),
  [GET_AUTHORIZE_TYPES]: (state, action) => state,
  [GET_AUTHORIZE_TYPES_SUCCESS]: (state, action) => Object.assign({}, state, {
    types: action.response
  }),
  [GET_OPERATE_NAME]: (state, action) => state,
  [GET_OPERATE_NAME_SUCCESS]: (state, action) => Object.assign({}, state, {
    operateName: action.response
  }),
  [GET_OPERATE_TEMPLETS]: (state, action) => state,
  [GET_OPERATE_TEMPLETS_SUCCESS]: (state, action) => Object.assign({}, state, {
    templets: action.response
  }),
  [GET_OPERATE_PART]: (state, action) => state,
  [GET_OPERATE_PART_SUCCESS]: (state, action) => Object.assign({}, state, {
    operatePart: action.response
  }),
  [GET_OPERATE_INTOROAD]: (state, action) => state,
  [GET_OPERATE_INTOROAD_SUCCESS]: (state, action) => Object.assign({}, state, {
    operateIntoRoad: action.response
  }),
  [GET_RECEIVE_ADDRESS]: (state, action) => state,
  [GET_RECEIVE_ADDRESS_SUCCESS]: (state, action) => Object.assign({}, state, {
    receiveAddress: action.response
  }),
  [GET_SALE_LIST]: (state, action) => state,
  [GET_SALE_LIST_SUCCESS]: (state, action) => Object.assign({}, state, {
    saleManage: action.response.saleManage,
    saleAssistant: action.response.saleAssistant
  }),
  [GET_DOCTOR_LIST]: (state, action) => state,
  [GET_DOCTOR_LIST_SUCCESS]: (state, action) => Object.assign({}, state, {
    doctorList: action.response,
  }),
  [POST_SURGERY_ORDER]: (state, action) => state,
  [POST_SURGERY_ORDER_SUCCESS]: (state, action) => Object.assign({}, state, {
    DDB: action.response,
  }),
  [GET_PRODUCTION_LIST]: (state, action) => state,
  [GET_PRODUCTION_LIST_SUCCESS]: (state, action) => {
    if (action.typeId) {           // 如果typeId大于0，说明请求的是产品类型关联的商品
      return Object.assign({}, state, {
        typeProductionList: action.response,
        typeId: action.typeId
      });
    } else {                        // 如果typeId小于0，说明请求的是手术模板关联的商品
      return Object.assign({}, state, {
        templetsProductionList: action.response,
        typeId: action.typeId
      });
    }
  },
  [GET_DISTRIBUTION]: (state, action) => state,
  [GET_DISTRIBUTION_SUCCESS]: (state, action) => Object.assign({}, state, {
    distributions: action.response,
  }),
  [INIT_STORE]: (state, action) => Object.assign({}, state, initialState),
  [SURGERY_ORDER_ERROR]: (state, action) => state,
  [INIT_STORE_CREATE_ORDER_TYPES]: (state, action) => Object.assign({}, state, {
    types: [],
    typeProductionList: []
  }),
  [INIT_STORE_CREATE_ORDER_TEMPLETS]: (state, action) => Object.assign({}, state, {
    templets: [],
    templetsProductionList: []
  }),
  [INIT_STORE_CREATE_ORDER_TYPES_PRODUCTION_LIST]: (state, action) => Object.assign({}, state, {
    typeProductionList: []
  }),
  [INIT_STORE_CREATE_ORDER_TEMPLETS_PRODUCTION_LIST]: (state, action) => Object.assign({}, state, {
    templetsProductionList: []
  }),
  [INIT_STORE_CREATE_ORDER_OPERATE_OTHER_ATTR]: (state, action) => Object.assign({}, state, {
    operateName: [],
    operatePart: [],
    operateIntoRoad: [],
  }),
  [INIT_STORE_CREATE_ORDER_AUTHORIZE_ORGANIZATION]: (state, action) => Object.assign({}, state, {
    authorizeOrganization: []
  }),

}

export default function createOrderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
