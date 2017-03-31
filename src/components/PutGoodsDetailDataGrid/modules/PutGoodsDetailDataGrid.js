/**
 * Created by liuyali on 2016/11/3.
 */
/**
 * Created by liuyali on 2016/11/3.
 */
export const GET_PUTORDERSGODDS_DATA = 'GET_PUTORDERSGODDS_DATA';
export const GET_PUTORDERSGODDS_DATA_SUCCESS = 'GET_PUTORDERSGODDS_DATA_SUCCESS';
export const GET_PUTORDERSGODDS_DATA_ERROR = 'GET_PUTORDERSGODDS_DATA_ERROR';

export function getPutOrdersGoodsData(GUID, CKRK, DDLX) {
  return {
    type: GET_PUTORDERSGODDS_DATA,
    payload: {
      GUID,
      CKRK,
      DDLX
    }
  }
}

const ACTION_HANDLERS = {
  [GET_PUTORDERSGODDS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    OrdersGoodsData: action.response
  }),
  [GET_PUTORDERSGODDS_DATA_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error
  })
};

const initialState = {
  OrdersGoodsData: []
}

export default function getPutOrdersGoodsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
