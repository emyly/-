/**
 * Created by 123 on 11/5/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SINGLE_WARE_HOUSE_CHILD_DATA = 'GET_SINGLE_WARE_HOUSE_CHILD_DATA';
export const GET_SINGLE_WARE_HOUSE_CHILD_DATA_SUCCESS = 'GET_SINGLE_WARE_HOUSE_CHILD_DATA_SUCCESS';
export const GET_SINGLE_LOCATION_CHILD_DATA = 'GET_SINGLE_LOCATION_CHILD_DATA';
export const GET_SINGLE_LOCATION_CHILD_DATA_SUCCESS = 'GET_SINGLE_LOCATION_CHILD_DATA_SUCCESS';
export const GET_SINGLE_LOCATION_GOODS_DATA_SUCCESS = 'GET_SINGLE_LOCATION_GOODS_DATA_SUCCESS';
export const INIT_CHOOSE_GOODS_STORE_DAILOG_DATA = 'INIT_CHOOSE_GOODS_STORE_DAILOG_DATA';
export const GET_SINGLE_LOCATION_GOODS_DATA = 'GET_SINGLE_LOCATION_GOODS_DATA';

// ------------------------------------
// Actions
// ------------------------------------
export function getSingleWareHouseChildData(id) {
  return {
    type: GET_SINGLE_WARE_HOUSE_CHILD_DATA,
    payload: {
      id                                    // 当前仓库ID
    }
  }
}
export function getSingleLocationChildData(id) {
  return {
    type: GET_SINGLE_LOCATION_CHILD_DATA,
    payload: {
      id                                    // 当前库位ID
    }
  }
}

export function getSingleLocationGoodsData(id, page) {
  return {
    type: GET_SINGLE_LOCATION_GOODS_DATA,
    payload: {
      id,                                    // 当前库位ID
      page
    }
  }
}

export function initChooseGoodsStoreDialogData() {
  return {
    type: INIT_CHOOSE_GOODS_STORE_DAILOG_DATA
  }
}


export const actions = {
  initChooseGoodsStoreDialogData,
  getSingleWareHouseChildData,            // 查询单个仓库的子仓库列表actions
  getSingleLocationChildData,            // 查询单个库位的子库位列表actions
  getSingleLocationGoodsData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SINGLE_WARE_HOUSE_CHILD_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    BoxesData: action.wareHouseResponse,
    goodsDataSource: []
  }),
  [GET_SINGLE_LOCATION_CHILD_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    BoxesData: action.locationResponse,
    goodsDataSource: []
  }),
  [GET_SINGLE_LOCATION_GOODS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    goodsDataSource: action.goodsResponse,
    BoxesData: [],
    goodsDataTotal: action.goodsTotalResponse,
    chooseLocationId: action.chooseLocationIdResponse,       // 当前选中的库位ID
    currentPage: action.currentPageResponse
  }),
  [INIT_CHOOSE_GOODS_STORE_DAILOG_DATA]: (state, action) => Object.assign({}, state, {
    BoxesData: [],
    goodsDataSource: []
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentPage: 1,
  BoxesData: [],
  goodsDataSource: [],
  goodsDataTotal: 0,
  chooseLocationId: -1       // 当前选中的库位ID
};
export default function chooseGoodsStoreDialogReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
