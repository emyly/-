/**
 * Created by niexq on 17/3/26.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_GOODS_TRANSFER_OPERATING_DATA = 'GET_GOODS_TRANSFER_OPERATING_DATA';
export const GET_GOODS_TRANSFER_OPERATING_DATA_SUCCESS = 'GET_GOODS_TRANSFER_OPERATING_DATA_SUCCESS';
export const GET_GOODS_TRANSFER_OPERATING_LOCATION_GOODS_DATA = 'GET_GOODS_TRANSFER_OPERATING_LOCATION_GOODS_DATA';
export const GET_GOODS_TRANSFER_OPERATING_LOCATION_GOODS_DATA_SUCCESS = 'GET_GOODS_TRANSFER_OPERATING_LOCATION_GOODS_DATA_SUCCESS';
export const POST_ORDER = 'GoodsTransferOperatingPOST_ORDER'
export const INIT_POST_ORDER = 'GoodsTransferOperating_INIT_POST_ORDER'
export const POST_ORDER_SUCCESS = 'GoodsTransferOperatingPOST_ORDER_SUCCESS'
export const CHANGE_TRAN_GOODS = 'GoodsTransferOperatingCHANGE_TRAN_GOODS'
export const INIT_GET_GOODS_TRANSFER_SEARCH_DATA = 'INIT_GET_GOODS_TRANSFER_SEARCH_DATA';
export const GET_GOODS_TRANSFER_SEARCH_DATA = 'GET_GOODS_TRANSFER_SEARCH_DATA';
export const GET_GOODS_TRANSFER_SEARCH_DATA_SUCCESS = 'GET_GOODS_TRANSFER_SEARCH_DATA_SUCCESS';
// ------------------------------------
// Actions
// ------------------------------------
export function getGoodsTransferOperatingData(id) {
  return {
    type: GET_GOODS_TRANSFER_OPERATING_DATA,
    payload: {
      id                                    // 当前仓库ID
    }
  }
}

export function getGoodsTransferLocationGoodsData(id) {
  return {
    type: GET_GOODS_TRANSFER_OPERATING_LOCATION_GOODS_DATA,
    payload: {
      id                                    // 当前库位ID
    }
  }
}


export function initPostOrder() {
  return {
    type: INIT_POST_ORDER
  }
}

export function postOrder(params) {
  return {
    type: POST_ORDER,
    payload: {
      params
    }
  }
}

export function changeTranGoods(goods) {
  return {
    type: CHANGE_TRAN_GOODS,
    payload: {
      goods
    }
  }
}

export function getSearchLocations(params) {
  return {
    type: GET_GOODS_TRANSFER_SEARCH_DATA,
    payload: {
      params
    }
  }
}

export function initSearchLocations() {
  return {
    type: INIT_GET_GOODS_TRANSFER_SEARCH_DATA
  }
}


export const actions = {
  getGoodsTransferOperatingData,
  getGoodsTransferLocationGoodsData,
  postOrder,
  initPostOrder,
  getSearchLocations,
  initSearchLocations
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_GOODS_TRANSFER_OPERATING_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    locations: action.response
  }),
  [GET_GOODS_TRANSFER_OPERATING_LOCATION_GOODS_DATA_SUCCESS]: (state, action) => {
    state.locations.some((value) => {
      if (Number(value.GUID) === Number(action.response.id)) {
        value.goods = action.response.goods
        return true;
      }
    })
    return Object.assign({}, state, {
      locations: state.locations
    })
  },
  [POST_ORDER_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      postStatus: '1'
    })
  },
  [CHANGE_TRAN_GOODS]: (state, action) => {
    return Object.assign({}, state, {
      tranGoods: action.payload.goods,
    })
  },
  [INIT_POST_ORDER]: (state, action) => Object.assign({}, state, {
    postStatus: '0'
  }),
  [GET_GOODS_TRANSFER_SEARCH_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    searchLocations: action.response
  }),
  [INIT_GET_GOODS_TRANSFER_SEARCH_DATA]: (state, action) => Object.assign({}, state, {
    searchLocations: []
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  locations: [],
  tranGoods: {},
  postStatus: '0',  // '0'表示初始化状态 '1'表示成功状态 '2'表示失败状态
  searchLocations: [], // 根据商品物料编号搜索出的库位集
};

export default function goodsTransferOperatingReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
