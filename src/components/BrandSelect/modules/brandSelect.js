/**
 * Created by liuyali on 2016/11/2.
 */
export const GET_BRAND_DATA = 'GET_BRAND_DATA'
export const GET_BRAND_DATA_SUCCESS = 'GET_BRAND_DATA_SUCCESS'
export const GET_BRAND_DATA_ERROR = 'GET_BRAND_DATA_ERROR'
export const FETCH_BRAND_SELECT_INIT_DATA = 'FETCH_BRAND_SELECT_INIT_DATA'
export const INIT_STORE = 'BRAND_SELECT_INIT_STORE'

export function getBrandData({ contractType, businessLineId, authorizeOrgId, authorizedOrgId }) {
  return {
    type: GET_BRAND_DATA,
    payload: {
      contractType,
      businessLineId,
      authorizeOrgId,
      authorizedOrgId
    }
  }
}

export function fetchbrandSelectInitData() {
  return {
    type: FETCH_BRAND_SELECT_INIT_DATA
  }
}

export function initStore() {
  return { type: INIT_STORE }
}

const initialState = {
  brandData: []
};

const ACTION_HANDLERS = {
  [GET_BRAND_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    brandData: action.response
  }),
  [GET_BRAND_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: 'error',
    error: action.error
  }),
  [FETCH_BRAND_SELECT_INIT_DATA]: (state) => Object.assign({}, state, {
    brandData: []
  }),
  [INIT_STORE]: (state) => Object.assign({}, state, initialState)
}

export default function brandSelectReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
