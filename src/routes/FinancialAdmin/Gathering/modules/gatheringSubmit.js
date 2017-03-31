/**
 * Created by NXQ on 2/14/2017.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const POST_GATHERING_SUBMIT_DATA = 'POST_GATHERING_SUBMIT_DATA';
export const POST_GATHERING_SUBMIT_DATA_SUCCESS = 'POST_GATHERING_SUBMIT_DATA_SUCCESS';
export const POST_GATHERING_SUBMIT_DATA_FAIL = 'POST_GATHERING_SUBMIT_DATA_FAIL';
export const INIT_FINANCIAL_GATHERING_SUBMIT_POST_STATE = 'INIT_FINANCIAL_GATHERING_SUBMIT_POST_STATE';
export const GET_GATHERING_ONE_DEPOSIT_DATA = 'GET_GATHERING_ONE_DEPOSIT_DATA';
export const GET_GATHERING_ONE_DEPOSIT_DATA_SUCCESS = 'GET_GATHERING_ONE_DEPOSIT_DATA_SUCCESS';
export const GET_GATHERING_BATCH_SALES_ORDER_DATA = 'GET_GATHERING_BATCH_SALES_ORDER_DATA';
export const GET_GATHERING_BATCH_SALES_ORDER_DATA_SUCCESS = 'GET_GATHERING_BATCH_SALES_ORDER_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function postGatheringSubmitData(postObject) {
  return {
    type: POST_GATHERING_SUBMIT_DATA,
    payload: postObject            // 销售收账创建
  }
}

export function initFinancialgatheringSubmitPostState() {
  return {
    type: INIT_FINANCIAL_GATHERING_SUBMIT_POST_STATE
  }
}

export function getGatheringOneDepositData(getObject) {
  return {
    type: GET_GATHERING_ONE_DEPOSIT_DATA,
    payload: getObject            // 获取单个预付款总数据
  }
}

export function getGatheringBatchSalesOrderData(getArray) {
  return {
    type: GET_GATHERING_BATCH_SALES_ORDER_DATA,
    payload: getArray            // 订单数组
  }
}

export const actions = {
  postGatheringSubmitData,            // 销售收账创建
  initFinancialgatheringSubmitPostState,
  getGatheringOneDepositData,
  getGatheringBatchSalesOrderData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_FINANCIAL_GATHERING_SUBMIT_POST_STATE]: (state, action) => Object.assign({}, state, {
    registerStatus: false,
    gatheringBatchOrderData: []
  }),
  [POST_GATHERING_SUBMIT_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    registerStatus: true
  }),
  [GET_GATHERING_ONE_DEPOSIT_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    depositTotal: action.responseData
  }),
  [GET_GATHERING_BATCH_SALES_ORDER_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    gatheringBatchOrderData: action.responseData
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  registerStatus: false,    // 收账登记是否成功
  depositTotal: -1,          // 预付款总额
  gatheringBatchOrderData: [] // 组合销售单详情的数据
};
export default function gatheringRegisterSubmit(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
