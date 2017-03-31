/**
 * Created by NXQ on 2017/1/9.
 */

export const GET_FINANCIAL_BILL_SUMMARY_DATA = 'GET_FINANCIAL_BILL_SUMMARY_DATA';
export const GET_FINANCIAL_BILL_SUMMARY_DATA_SUCCESS = 'GET_FINANCIAL_BILL_SUMMARY_DATA_SUCCESS';

export function getFinancialBillSummaryData(ddid) {
  return {
    type: GET_FINANCIAL_BILL_SUMMARY_DATA,
    payload: {
      ddid
    }
  }
}

export const actions = {
  getFinancialBillSummaryData
};

const ACTION_HANDLERS = {
  [GET_FINANCIAL_BILL_SUMMARY_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.response
  })
}

const initialState = {
  data: {}
}

export default function getFinancialBillSmmryDataReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
