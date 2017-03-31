/**
 * Created by NXQ on 11/25/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const INIT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA = 'INIT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA';
export const PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA = 'PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA';
export const PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_SUCCESS = 'PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_SUCCESS';
export const PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_FAIL = 'PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function putMakePriceAddSingleGoodsData(makePriceGoodsCreateArray) {
  return {
    type: PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA,
    payload: makePriceGoodsCreateArray           // 定价商品数组
  }
}
export function initMakePriceAddSingleGoodsData() {
  return {
    type: INIT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA
  }
}


export const actions = {
  putMakePriceAddSingleGoodsData,
  initMakePriceAddSingleGoodsData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA]: (state, action) => Object.assign({}, state, {
    status: '0'
  }),
  [PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: '1'
  }),
  [PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: '2'
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  status: '0',       // '0'表示init状态 '1'表示成功状态 '2'表示失败状态
};
export default function makePriceAddSingleGoodsDialogReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
