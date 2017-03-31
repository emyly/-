/**
 * Created by qyf on 2016/11/3.
 */

// 物流详情列表
export const GET_ORDERGOOGS_D_DATA = 'GET_LOGISTICS_R_DATA'
export const GET_ORDERGOOGS_D_DATA_SUCCESS = 'GET_ORDERGOOGS_D_DATA_SUCCESS';
export const GET_ORDERGOOGS_D_DATA_FAIL = 'GET_ORDERGOOGS_D_DATA_FAIL';

// Actions
export function getOrderGoodsDetailDate(id, type) {
  return {
    type: GET_ORDERGOOGS_D_DATA,
    payload: {
      id,
      type
    }
  }
}
export const actions = {
  getOrderGoodsDetailDate
};
const ACTION_HANDLERS = {
  [GET_ORDERGOOGS_D_DATA]: (state, actions) => state,
  [GET_ORDERGOOGS_D_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    orderGoodsDetailData: action.response
  }),
  [GET_ORDERGOOGS_D_DATA_FAIL]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error
  })
};
// Reducer
const initState = {
  orderGoodsDetailData: []
};
export default function orderGoodsReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
