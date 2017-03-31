/**
 * Created by niexq on 17/3/25.
 */

// ------------------------------------
// Constants
// ------------------------------------

export const GET_GOODS_TRANSFER_LIST_DATA = 'GET_GOODS_TRANSFER_LIST_DATA';
export const GET_GOODS_TRANSFER_LIST_DATA_SUCCESS = 'GET_GOODS_TRANSFER_LIST_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getGoodsTransferListData(page = 1) {
  return {
    type: GET_GOODS_TRANSFER_LIST_DATA,
    payload: {
      page
    }
  }
}


export const actions = {
  getGoodsTransferListData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_GOODS_TRANSFER_LIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    goodsTransferListData: action.dataResponse,
    currentPage: action.currentPageResponse,
    totalCount: action.totalCountResponse
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  goodsTransferListData: [],
  currentPage: 1,
  totalCount: 0
};

export default function goodsTransferListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
