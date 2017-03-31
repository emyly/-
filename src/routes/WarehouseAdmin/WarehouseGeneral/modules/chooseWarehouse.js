// ------------------------------------
// Constants
// ------------------------------------

export const PATCH_FORBIDANDUSEWAREHOUSE_DATA = 'PATCH_FORBIDANDUSEWAREHOUSE_DATA'
export const PATCH_FORBIDANDUSEWAREHOUSE_SUCCESS = 'PATCH_FORBIDANDUSEWAREHOUSE_SUCCESS'
export const PATCH_FORBIDANDUSEWAREHOUSE_ERROR = 'PATCH_FORBIDANDUSEWAREHOUSE_ERROR'
export const PATCH_FORBIDANDUSEWAREHOUSE_INIT = 'PATCH_FORBIDANDUSEWAREHOUSE_INIT'
export const GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA = 'GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA'
export const GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_SUCCESS = 'GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_SUCCESS'
export const GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_ERROR = 'GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_ERROR'
// ------------------------------------
// Actions
// ------------------------------------
export function patchForbidAndUseWarehouse(params) {
  return {
    type: PATCH_FORBIDANDUSEWAREHOUSE_DATA,
    payload: {
      params
    }
  }
}
export function patchForbidAndUseWarehouseInit(params) {
  return {
    type: PATCH_FORBIDANDUSEWAREHOUSE_INIT,

  }
}
export function getSingleLocationWarehouseProduction(params) {
  return {
    type: GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA,
    payload: {
      params
    }
  }
}
export const actions = {
  patchForbidAndUseWarehouse,
  getSingleLocationWarehouseProduction
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PATCH_FORBIDANDUSEWAREHOUSE_DATA]: (state, action) => state,
  [PATCH_FORBIDANDUSEWAREHOUSE_SUCCESS]: (state, action) => Object.assign({}, state, {
    forbidAndUseData: action.response
  }),
  [PATCH_FORBIDANDUSEWAREHOUSE_ERROR]: (state, action) => Object.assign({}, state, {
    error: action.response
  }),
  [PATCH_FORBIDANDUSEWAREHOUSE_INIT]: (state, action) => Object.assign({}, state, {
    error: {},
    singleLocationWarehouseProductionData: {}
  }),
  [GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA]: (state, action) => state,
  [GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    singleLocationWarehouseProductionData: action.response,
    currentPage: action.currentPage
  }),
  [GET_SINGLELOCATIONWAREHOUSEPRODUCTION_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    error: action.response
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  forbidAndUseData: {},
  error: {},
  singleLocationWarehouseProductionData: {},
  currentPage: null

}

export default function forbidAndUseWarehouseReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
