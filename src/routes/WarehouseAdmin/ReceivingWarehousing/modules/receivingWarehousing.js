/**
 * Created by qyf on 2016/11/5.
 */
/* constants*/
export const GET_RECEVING_LIST_DATA = 'GET_RECEVING_DATA';
export const GET_RECEVING_LIST_DATA_SUCCESS = 'GET_RECEVING_LIST_DATA_SUCCESS';
export const GET_RECEVING_GOODS_DATAIL_DATA = 'GET_RECEVING_GOODS_DATAIL_DATA';
export const GET_RECEVING_GOODS_DATAIL_DATA_SUCCESS = 'GET_RECEVING_GOODS_DATAIL_DATA_SUCCESS';


// Actions

export function getRecevingListData(id) {
  return {
    type: GET_RECEVING_LIST_DATA,
    payload: {
      type,
      id
    }
  }
}
export function getRecevingGoodsData(id) {
  return {
    type: GET_RECEVING_GOODS_DATAIL_DATA,
    payload: {
      id
    }
  }
}
export const actions = {
  getRecevingListData
}
const ACTTON_HANDLERS = {
  [GET_RECEVING_LIST_DATA_SUCCESS]: (state, actions) => Obiect.assign({}, state, {
    GathringData: actions.response
  }),
  [GET_RECEVING_GOODS_DATAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    recevingGoodsData: action.recevingResponse,
  })
}
// reducer
const initialState = {
  recevingGoodsData: {}   // 收货入库的详情

}
export default function gathreingReducer(state = initialState, action) {
  const handler = ACTTON_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
