// ------------------------------------
// Constants
// ------------------------------------
export const GET_WAREHOUSEFORNEED_DATA = 'GET_WAREHOUSEFORNEED_DATA'
export const GET_WAREHOUSEFORNEED_DATA_SUCCESS = 'GET_WAREHOUSEFORNEED_DATA_SUCCESS'
export const GET_WAREHOUSEFORNEED_DATA_FAIL = 'GET_WAREHOUSEFORNEED_DATA_FAIL'
export const GET_LOCATION_DATA = 'GET_LOCATION_DATA'
export const GET_LOCATION_DATA_SUCCESS = 'GET_LOCATION_DATA_SUCCESS'
export const GET_LOCATION_DATA_FAIL = 'GET_LOCATION_DATA_FAIL'
export const GET_CHILDLOCATION_DATA = 'GET_CHILDLOCATION_DATA'
export const GET_CHILDLOCATION_DATA_SUCCESS = 'GET_CHILDLOCATION_DATA_SUCCESS'
export const GET_CHILDLOCATION_DATA_FAIL = 'GET_CHILDLOCATION_DATA_FAIL'
export const GET_WAREHOUSE_DATA = 'GET_WAREHOUSE_DATA'
export const GET_WAREHOUSE_DATA_SUCCESS = 'GET_WAREHOUSE_DATA_SUCCESS'
export const GET_WAREHOUSE_DATA_FAIL = 'GET_WAREHOUSE_DATA_FAIL'
export const INIT_IS_TOP_WAREHOUSE_STATUS = 'INIT_IS_TOP_WAREHOUSE_STATUS'

// ------------------------------------
// Actions
// ------------------------------------
export function getWarehouseForNeedData(id, ckid) {     // type默认true是仓库层面,false是库位层面
  return {
    type: GET_WAREHOUSEFORNEED_DATA,
    payload: {
      id,
      ckid,
      type: true
    }
  }
}

export function getLocationForNeedData(id, ckid, crkid) {     // 与上面办法一样后期优化 type默认true是仓库层面,false是库位层面
  return {
    type: GET_WAREHOUSEFORNEED_DATA,
    payload: {
      id,
      ckid,
      crkid,
      type: false
    }
  }
}

export function getLocation(id) {
  return {
    type: GET_LOCATION_DATA,
    payload: {
      id
    }
  }
}
export function getChildLocation(id) {
  return {
    type: GET_CHILDLOCATION_DATA,
    payload: {
      id
    }
  }
}

export function getWarehouseData(id) {
  return {
    type: GET_WAREHOUSE_DATA,
    payload: {
      id
    }
  }
}

export function initIsTopWarehouseStatus() {
  return {
    type: INIT_IS_TOP_WAREHOUSE_STATUS
  }
}


export const actions = {
  getLocationForNeedData,
  getWarehouseForNeedData,
  getLocation,
  getChildLocation,
  getWarehouseData,
  initIsTopWarehouseStatus
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_WAREHOUSEFORNEED_DATA]: (state, action) => state,
  [GET_WAREHOUSEFORNEED_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    warehouseData: action.response,
    isTopWarehouse: action.isTopWarehouse
  }),
  [GET_WAREHOUSEFORNEED_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.response
  }),
  [GET_LOCATION_DATA]: (state, action) => state,
  [GET_LOCATION_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    warehouseData: action.response,
  }),
  [GET_LOCATION_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.response
  }),
  [GET_CHILDLOCATION_DATA]: (state, action) => state,
  [GET_CHILDLOCATION_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    warehouseData: action.response
  }),
  [GET_CHILDLOCATION_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.response
  }),
  [GET_WAREHOUSE_DATA]: (state, action) => state,
  [GET_WAREHOUSE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    warehouseData: action.response,
    isTopWarehouse: action.isTopWarehouse
  }),
  [GET_WAREHOUSE_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.response
  }),
  [INIT_IS_TOP_WAREHOUSE_STATUS]: (state, action) => Object.assign({}, state, {
    warehouseData: [],
    isTopWarehouse: false
  })
  
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  warehouseData: [],
  isTopWarehouse: false   // 是否是顶层仓库
};

export default function depotSelectDialogReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
