/**
 * Created by wangming on 2016/1/9.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_FINANCIAL_BILLING_DETAIL = 'GET_FINANCIAL_BILLING_DETAIL';
export const GET_FINANCIAL_BILLING_DETAIL_SUCCESS = 'GET_FINANCIAL_BILLING_DETAIL_SUCCESS';
export const GET_FINANCIAL_BILLING_DETAIL_FAIL = 'GET_FINANCIAL_BILLING_DETAIL_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function getFinancialBillingDetail(params) {
  return {
    type: GET_FINANCIAL_BILLING_DETAIL,
    payload: params
  }
}

export const actions = {
  getFinancialBillingDetail
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_FINANCIAL_BILLING_DETAIL_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    financialListData: action.response
  }),
  [GET_FINANCIAL_BILLING_DETAIL_FAIL]: (state, action) => Object.assign({}, state, {
    error: action.response
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  financialListData: [],
  currentPage: 1,
  error: {}
};

export default function getFinancialBillingDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
