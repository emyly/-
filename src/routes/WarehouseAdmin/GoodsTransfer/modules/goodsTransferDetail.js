/**
 * Created by niexq on 17/3/25.
 */

// ------------------------------------
// Constants
// ------------------------------------

export const GET_GOODS_TRANSFER_DETAIL_DATA = 'GET_GOODS_TRANSFER_DETAIL_DATA';
export const GET_GOODS_TRANSFER_DETAIL_DATA_SUCCESS = 'GET_GOODS_TRANSFER_DETAIL_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getGoodsTransferDetailData(page = 1) {
  return {
    type: GET_GOODS_TRANSFER_DETAIL_DATA,
    payload: {
      page
    }
  }
}


export const actions = {
  getGoodsTransferDetailData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_GOODS_TRANSFER_DETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    goodsTransferDetailData: action.dataResponse
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  goodsTransferDetailData: []
};

export default function goodsTransferDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
