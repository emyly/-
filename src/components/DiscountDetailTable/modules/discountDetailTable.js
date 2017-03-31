// ------------------------------------
// Constants
// ------------------------------------
export const GET_DISCOUNTDETAIL_DATA = 'GET_DISCOUNTDETAIL_DATA'
export const GET_DISCOUNTDETAIL_DATA_SUCCESS = 'GET_DISCOUNTDETAIL_DATA_SUCCESS'
export const GET_DISCOUNTDETAIL_DATA_FAIL = 'GET_DISCOUNTDETAIL_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function getDiscountDetail(id) {
  return {
    type: GET_DISCOUNTDETAIL_DATA,
    payload: {
      id
    }
  }
}

export const actions = {
  getDiscountDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DISCOUNTDETAIL_DATA]: (state, action) => state,
  [GET_DISCOUNTDETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    discountData: action.response
  }),
  [GET_DISCOUNTDETAIL_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  discountData: {}
}

export default function discountDetailTableReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
