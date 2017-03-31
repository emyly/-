/**
 * Created by liuyali on 2016/11/3.
 */
export const GET_DLRYORDERSGODDS_DATA = 'GET_DLRYORDERSGODDS_DATA';
export const GET_DLRYORDERSGODDS_DATA_SUCCESS = 'GET_DLRYORDERSGODDS_DATA_SUCCESS';
export const GET_DLRYORDERSGODDS_DATA_ERROR = 'GET_DLRYORDERSGODDS_DATA_ERROR';

export function getDlryOrdersGoodsData(GUID, CKRK, DDLX) {
  return {
    type: GET_DLRYORDERSGODDS_DATA,
    payload: {
      GUID,
      CKRK,
      DDLX
    }
  }
}

const ACTION_HANDLERS = {
  [GET_DLRYORDERSGODDS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    OrdersGoodsData: action.response
  }),
  [GET_DLRYORDERSGODDS_DATA_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error
  })
};

const initialState = {
  OrdersGoodsData: []
}

export default function getDlryOrdersGoodsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
