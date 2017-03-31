/**
 * Created by sjf on 2016/11/16.
 */
export const FETCH_SALE_LIST = 'FETCH_SALE_LIST';
export const FETCH_SALE_LIST_SUCCESS = 'FETCH_SALE_LIST_SUCCESS';
export const FETCH_SALE_LIST_FAIL = 'FETCH_SALE_LIST_FAIL';
// ------------------------------------
// Action
// ------------------------------------
export function fecthSalelist(orgId, type, page) {
  return {
    type: FETCH_SALE_LIST,
    payload: {
      orgId,
      type,
      page
    }

  }
}
export function fecthSalelistSuccess(saleList) {
  return {
    type: FETCH_SALE_LIST_SUCCESS,
    saleList
  }
}

export function fecthSalelistFail(error) {
  return {
    type: FETCH_SALE_LIST_FAIL,
    error
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SALE_LIST]: (state, action) => ({
    ...state,
    isFetching: true,
    orgId: action.orgId
  }),

  [FETCH_SALE_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    saleList: action.saleList.result.Result.GLXSRY,
    totalCount: action.saleList.result.Result.Total,
    currentPage: action.saleList.currentPage

  }),

  [FETCH_SALE_LIST_FAIL]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.error
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  saleList: []
};

export default function saleListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
