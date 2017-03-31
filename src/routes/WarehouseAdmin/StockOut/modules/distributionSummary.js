/**
 * Created by wangming on 11/15/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DISTRIBUTION_SUMMARY_DATA = 'GET_DISTRIBUTION_SUMMARY_DATA';
export const GET_DISTRIBUTION_SUMMARY_DATA_SUCCESS = 'GET_DISTRIBUTION_SUMMARY_DATA_SUCCESS';
export const GET_DISTRIBUTION_SUMMARY_DATA_FAIL = 'GET_DISTRIBUTION_SUMMARY_DATA_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function getWarehouseInOutGoodsSummary(orderId, orderType) {
  console.debug('getWarehouseInOutGoodsSummary: 1');
  return {
    type: GET_DISTRIBUTION_SUMMARY_DATA,
    payload: {
      DDB: {
        GUID: orderId,         // 订单id
        CKRK: '0',        // 出入库类型 0 出库 1 入库
        DDLX: orderType        // 订单类型
      }
    }
  }
}

export const actions = {
  getWarehouseInOutGoodsSummary
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DISTRIBUTION_SUMMARY_DATA_SUCCESS]: (state, action) => {
    console.debug('getWarehouseInOutGoodsSummary: 2', action);
    return Object.assign({}, state, {
      summaryData: action.response
    })
  },
  [GET_DISTRIBUTION_SUMMARY_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  summaryData: [],    // 出库商品汇总
  errorData: {}
};

export default function getWarehouseInOutGoodsSummaryReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
