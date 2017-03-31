/**
 * Created by NXQ on 11/4/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_CREDIT_QUERY_DATA = 'GET_CREDIT_QUERY_DATA';
export const GET_CREDIT_QUERY_DATA_SUCCESS = 'GET_CREDIT_QUERY_DATA_SUCCESS';
export const CHANGE_CREDIT_CURRENT_PAGE = 'CHANGE_CREDIT_CURRENT_PAGE';
export const CHANGE_NO_CREDIT_CURRENT_PAGE = 'CHANGE_NO_CREDIT_CURRENT_PAGE';

// ------------------------------------
// Actions
// ------------------------------------
export function getCreditQueryData(id) {
  return {
    type: GET_CREDIT_QUERY_DATA,
    payload: {
      id
    }
  }
}

export function changeCreditCurrentPage(page) {
  return {
    type: CHANGE_CREDIT_CURRENT_PAGE,
    payload: {
      page
    }
  }
}

export function changeNoCreditCurrentPage(page) {
  return {
    type: CHANGE_NO_CREDIT_CURRENT_PAGE,
    payload: {
      page
    }
  }
}


export const actions = {
  getCreditQueryData,
  changeCreditCurrentPage,
  changeNoCreditCurrentPage
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CREDIT_QUERY_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    creditQueryData: action.creditResponse,
    noCreditQueryData: action.noCreditResponse,
    creditCurrentPage: 1,
    creditTotalCount: action.creditTotalResponse,
    noCreditCurrentPage: 1,
    noCreditTotalCount: action.noCreditTotalResponse,
  }),
  [CHANGE_CREDIT_CURRENT_PAGE]: (state, action) => Object.assign({}, state, {
    creditCurrentPage: action.payload.page
  }),
  [CHANGE_NO_CREDIT_CURRENT_PAGE]: (state, action) => Object.assign({}, state, {
    noCreditCurrentPage: action.payload.page
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  creditQueryData: [],
  noCreditQueryData: [],
  creditCurrentPage: 1,
  creditTotalCount: 0,
  noCreditCurrentPage: 1,
  noCreditTotalCount: 0
};
export default function creditQueryReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
