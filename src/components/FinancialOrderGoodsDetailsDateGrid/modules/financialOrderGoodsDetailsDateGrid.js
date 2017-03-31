/**
 * Created by NXQ on 2017/1/9.
 */

export const GET_FINANCIAL_ORDER_GOODS_DETAILS_DATA = 'GET_FINANCIAL_ORDER_GOODS_DETAILS_DATA'
export const GET_FINANCIAL_ORDER_GOODS_DETAILS_DATA_SUCCESS = 'GET_FINANCIAL_ORDER_GOODS_DETAILS_DATA_SUCCESS';
export const GET_FINANCIAL_ORDER_GOODS_DETAILS_DATAFAIL = 'GET_FINANCIAL_ORDER_GOODS_DETAILS_DATAFAIL';

// Actions
export function getFinancialOrderGoodsDetailDate({ id, type }) {
  return {
    type: GET_FINANCIAL_ORDER_GOODS_DETAILS_DATA,
    payload: {
      id,
      type
    }
  }
}
export const actions = {
  getFinancialOrderGoodsDetailDate
};
const ACTION_HANDLERS = {
  [GET_FINANCIAL_ORDER_GOODS_DETAILS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    orderGoodsDetailData: action.response
  })
};

// Reducer
const initState = {
  orderGoodsDetailData: []
};
export default function financialOrderGoodsReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
