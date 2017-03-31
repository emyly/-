/**
 * Created by wangming on 11/19/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_WAREHOOUSE_BASICINFO = 'GET_WAREHOOUSE_BASICINFO';
export const GET_WAREHOOUSE_BASICINFO_SUCCESS = 'GET_WAREHOOUSE_BASICINFO_SUCCESS';
export const GET_WAREHOOUSE_BASICINFO_FAIL = 'GET_WAREHOOUSE_BASICINFO_FAIL';
export const GET_WAREHOOUSE_DETAIL = 'GET_WAREHOOUSE_DETAIL';
export const GET_WAREHOOUSE_DETAIL_SUCCESS = 'GET_WAREHOOUSE_DETAIL_SUCCESS';
export const GET_WAREHOOUSE_DETAIL_FAIL = 'GET_WAREHOOUSE_DETAIL_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function getWarehouseBasicInfo(warehouseId) {
  return {
    type: GET_WAREHOOUSE_BASICINFO,
    payload: { CRKDID: warehouseId }
  };
}

export function getWarehouseDetail(orderId, warehouseId) {
  return {
    type: GET_WAREHOOUSE_DETAIL,
    payload: {
      DDID: orderId,
      CRKDID: warehouseId
    }
  };
}

export const actions = {
  getWarehouseBasicInfo,
  getWarehouseDetail
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_WAREHOOUSE_BASICINFO_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      outBoundBasic: action.response
    })
  },
  [GET_WAREHOOUSE_BASICINFO_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response
  }),
  [GET_WAREHOOUSE_DETAIL_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      outBoundDetail: action.response
    })
  },
  [GET_WAREHOOUSE_DETAIL_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  outBoundBasic: {},
  outBoundDetail: [],
  errorData: {}
};

export default function outBoundDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

