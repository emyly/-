/**
 * Created by qyf on 2016/11/3.
 */
export const GET_ORDERGOODS_SETDATA_DATA = 'GET_ORDERGOODS_SETDATA_DATA';
export const GET_ORDERGOODS_SETDATA_DATA_SUCCESS = 'GET_ORDERGOODS_SETDATA_DATA_SUCCESS';
export const GET_ORDERGOODS_SETDATA_DATA_FAIL = 'GET_ORDERGOODS_SETDATA_DATA_FAIL'

export function getOrderSetData(id, type) {
  return {
    type: GET_ORDERGOODS_SETDATA_DATA,
    payload: {
      id,
      type
    }
  }
}
export const actions = {
  getOrderSetData
};
const ACTION_HANDLERS = {
  [GET_ORDERGOODS_SETDATA_DATA]: (state, actions) => state,
  [GET_ORDERGOODS_SETDATA_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    orderGoodsSetData: action.response
  }),
  [GET_ORDERGOODS_SETDATA_DATA_FAIL]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error
  })
};
// Reducer
const initState = {
  orderGoodsSetData: []
};
export default function orderGoodsGetReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
