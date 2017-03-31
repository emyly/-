/**
 * Created by qyf on 2016/11/10.
 */
/* constants*/

export const GET_RECEVING_GOODS_DATAIL_DATA = 'GET_RECEVING_DATA';
export const GET_RECEVING_GOODS_DATAIL_DATA_SUCCESS = 'GET_RECEVING_GOODS_DATAIL_DATA_SUCCESS';
export const GET_RECEVING_GOODS_DATAIL_DATA_FAIL = 'GET_RECEVING_GOODS_DATAIL_DATA_FAIL'


// Actions
export function getRecevingGoodsData(GUID, CKRK, DDLX) {
  return {
    type: GET_RECEVING_GOODS_DATAIL_DATA,
    payload: {
      GUID,
      CKRK,
      DDLX   // 订单id
    }
  }
}
export const actions = {
  getRecevingGoodsData
}
const ACTTON_HANDLERS = {
  [GET_RECEVING_GOODS_DATAIL_DATA_SUCCESS]: (state, actions) => Object.assign({}, state, {
    GathringData: actions.response
  }),
  [GET_RECEVING_GOODS_DATAIL_DATA_FAIL]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error
  })
}
// reducer
const initialState = {
  GathringData: []   // 收货入库的详情

}
export default function gathreingReducer(state = initialState, action) {
  const handler = ACTTON_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
