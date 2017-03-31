/**
 * Created by chenming on 2016/11/3.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_PICKINGPRODUCTIONLIST_DATA = 'GET_PICKINGPRODUCTIONLIST_DATA'
export const GET_PICKINGPRODUCTIONLIST_DATA_SUCCESS = 'GET_PICKINGPRODUCTIONLIST_DATA_SUCCESS'
export const GET_PICKINGPRODUCTIONLIST_DATA_FAIL = 'GET_PICKINGPRODUCTIONLIST_DATA_FAIL'


// ------------------------------------
// Actions
// ------------------------------------
export function getPickingProductionData(params) {
  return {
    type: GET_PICKINGPRODUCTIONLIST_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  getPickingProductionData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PICKINGPRODUCTIONLIST_DATA]: (state, action) => state,
  [GET_PICKINGPRODUCTIONLIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    pickingProductionData: action.response,
    currentPage: action.currentPage
  }),
  [GET_PICKINGPRODUCTIONLIST_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  pickingProductionData: {},
  currentPage: 1
}

export default function watchGetPickingProductionData(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

