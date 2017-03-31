/**
 * Created by NXQ on 2017/1/9.
 */

export const POST_FINANCIAL_EXPRESS_LOGISTICS_SUBMIT_DATA = 'POST_FINANCIAL_EXPRESS_LOGISTICS_SUBMIT_DATA';
export const POST_FINANCIAL_EXPRESS_LOGISTICS_SUBMIT_DATA_SUCCESS = 'POST_FINANCIAL_EXPRESS_LOGISTICS_SUBMIT_DATA_SUCCESS';
export const INIT_FINANCIAL_SUBMIT_POST_STATE = 'INIT_FINANCIAL_SUBMIT_POST_STATE';
import Constant from 'lib/constant'

export function postFinancialExpressOrLogisticsData({ type, ddid, body }) {
  return {
    type: POST_FINANCIAL_EXPRESS_LOGISTICS_SUBMIT_DATA,
    payload: {
      type,
      ddid,
      body
    }
  }
}

export function initFinancialSubmitPostState() {
  return {
    type: INIT_FINANCIAL_SUBMIT_POST_STATE
  }
}

export const actions = {
  postFinancialExpressOrLogisticsData,
  initFinancialSubmitPostState
};

const ACTION_HANDLERS = {
  [INIT_FINANCIAL_SUBMIT_POST_STATE]: (state, action) => Object.assign({}, state, {
    postLogisticsStatus: '0',  // 物流费登记状态标识
    postDiscountStatus: '0',   // 折扣登记状态标识
    postBaddebtsStatus: '0',   // 坏账登记状态标识
    postUrgentStatus: '0'      // 加急费登记状态标识
  }),
  [POST_FINANCIAL_EXPRESS_LOGISTICS_SUBMIT_DATA_SUCCESS]: (state, action) => {
    const actionStatus = {
      postLogisticsStatus: '0',  // 物流费登记状态标识
      postDiscountStatus: '0',   // 折扣登记状态标识
      postBaddebtsStatus: '0',   // 坏账登记状态标识
      postUrgentStatus: '0'      // 加急费登记状态标识
    };
    switch (action.actionType) {
      case Constant.SAAS.financial.LOGISTICS:
        actionStatus.postLogisticsStatus = '1';
        break;
      case Constant.SAAS.financial.DISCOUNT:
        actionStatus.postDiscountStatus = '1';
        break;
      case Constant.SAAS.financial.BADDEBTS:
        actionStatus.postBaddebtsStatus = '1';
        break;
      case Constant.SAAS.financial.URGENT:
        actionStatus.postUrgentStatus = '1';
        break;
    }
    return Object.assign({}, state, {
      ...actionStatus
    })
  }
}

const initialState = {
  postLogisticsStatus: '0',  // 物流费登记状态标识
  postDiscountStatus: '0',   // 折扣登记状态标识
  postBaddebtsStatus: '0',   // 坏账登记状态标识
  postUrgentStatus: '0'      // 加急费登记状态标识
}

export default function financialSubmitDialogReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
