/**
 * Created by wangming on 2017/1/5.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_FINANCIALLIST_DATA = 'GET_FINANCIALLIST_DATA'
export const GET_FINANCIALLIST_DATA_SUCCESS = 'GET_FINANCIALLIST_DATA_SUCCESS'
export const GET_FINANCIALLIST_DATA_FAIL = 'GET_FINANCIALLIST_DATA_FAIL'


// ------------------------------------
// Actions
// ------------------------------------
export function getFinancialListData(params) {
  return {
    type: GET_FINANCIALLIST_DATA,
    payload: params
  }
}

export const actions = {
  getFinancialListData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_FINANCIALLIST_DATA]: (state, action) => state,
  [GET_FINANCIALLIST_DATA_SUCCESS]: (state, action) => {
    // console.debug("GET_FINANCIALLIST_DATA_SUCCESS:", action.currentPage);
    return Object.assign({}, state, {
      status: true,
      financialListData: action.response,
      currentPage: action.currentPage,
      totalPage: action.totalPage,
    })
  },
  [GET_FINANCIALLIST_DATA_FAIL]: (state, action) => {
    return Object.assign({}, state, {
      status: true,
      error: action.response
    })
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  financialListData: [],
  currentPage: 1,
  error: {},
  totalPage: 0,
}

export default function getFinancialListDataReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

