/**
 * Created by NXQ on 2017/1/12.
 */

export const POST_FINANCIAL_VERIFICATION_SUBMIT_DATA = 'POST_FINANCIAL_VERIFICATION_SUBMIT_DATA';
export const POST_FINANCIAL_VERIFICATION_SUBMIT_DATA_SUCCESS = 'POST_FINANCIAL_VERIFICATION_SUBMIT_DATA_SUCCESS';
export const INIT_FINANCIAL_VERIFICATION_SUBMIT_POST_STATE = 'INIT_FINANCIAL_VERIFICATION_SUBMIT_POST_STATE';
import Constant from 'lib/constant';

export function postFinancialVerificationData({ body }) {
  return {
    type: POST_FINANCIAL_VERIFICATION_SUBMIT_DATA,
    payload: {
      body
    }
  }
}

export function initFinancialVerificationSubmitPostState() {
  return {
    type: INIT_FINANCIAL_VERIFICATION_SUBMIT_POST_STATE
  }
}

export const actions = {
  postFinancialVerificationData,
  initFinancialVerificationSubmitPostState
};

const ACTION_HANDLERS = {
  [INIT_FINANCIAL_VERIFICATION_SUBMIT_POST_STATE]: (state, action) => Object.assign({}, state, {
    verificationStatus: '0'
  }),
  [POST_FINANCIAL_VERIFICATION_SUBMIT_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
      verificationStatus: '1'
    })
}

const initialState = {
  verificationStatus: '0'  // '0'核销状态初始状态,'1'核销成功状态 '2'核销失败状态
}

export default function financialVerificationSubmitReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
