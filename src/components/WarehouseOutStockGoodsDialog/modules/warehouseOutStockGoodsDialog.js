/**
 * Created by NXQ on 17/1/20.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA = 'GET_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA';
export const GET_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA_SUCCESS = 'GET_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA_SUCCESS';
export const INIT_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA = 'INIT_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA';


// ------------------------------------
// Actions
// ------------------------------------
export function getWarehouseOutStockGoodsData({ddid, ckid}) {
  return {
    type: GET_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA,
    payload: {
      ddid,
      ckid
    }
  }
}

export function initWarehouseOutStockGoodsData() {
  return {
    type: INIT_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA
  }
}


export const actions = {
  getWarehouseOutStockGoodsData,
  initWarehouseOutStockGoodsData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    goodsData: action.dataResponse
  }),
  [INIT_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA]: (state, action) => Object.assign({}, state, {
    goodsData: []
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  goodsData: []
};

export default function depositImprestPartnerReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
