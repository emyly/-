/**
 * Created by NXQ on 2/14/2017.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const POST_BILLING_BATCH_SUBMIT_DATA = 'POST_BILLING_BATCH_SUBMIT_DATA';
export const POST_BILLING_BATCH_SUBMIT_DATA_SUCCESS = 'POST_BILLING_BATCH_SUBMIT_DATA_SUCCESS';
export const POST_BILLING_BATCH_SUBMIT_DATA_FAIL = 'POST_BILLING_BATCH_SUBMIT_DATA_FAIL';
export const INIT_FINANCIAL_BILLING_SUBMIT_POST_STATE = 'INIT_FINANCIAL_BILLING_SUBMIT_POST_STATE';


// ------------------------------------
// Actions
// ------------------------------------
export function postBillingBatchSubmitData(postObject) {
  return {
    type: POST_BILLING_BATCH_SUBMIT_DATA,
    payload: postObject            // 销售开票创建
  }
}

export function initFinancialBillingSubmitPostState() {
  return {
    type: INIT_FINANCIAL_BILLING_SUBMIT_POST_STATE
  }
}

export const actions = {
  postBillingBatchSubmitData,            // 销售开票创建
  initFinancialBillingSubmitPostState
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_FINANCIAL_BILLING_SUBMIT_POST_STATE]: (state, action) => Object.assign({}, state, {
    registerStatus: false
  }),
  [POST_BILLING_BATCH_SUBMIT_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    registerStatus: true
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  registerStatus: false,    // 开票登记是否成功
};
export default function billingRegisterSubmit(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
