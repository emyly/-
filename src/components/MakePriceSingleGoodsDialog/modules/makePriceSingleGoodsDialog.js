/**
 * Created by NXQ on 11/29/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const INIT_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA = 'INIT_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA';
export const GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA = 'GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA';
export const GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_SUCCESS = 'GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_SUCCESS';
export const GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL = 'GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL';
export const INIT_DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA = 'INIT_DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA';
export const DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA = 'DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA';
export const DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_SUCCESS = 'DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_SUCCESS';
export const DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL = 'DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL';
export const INIT_GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA = 'INIT_GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA';
export const GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA = 'GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA';
export const GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_SUCCESS = 'GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_SUCCESS';
export const GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_FAIL = 'GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function initMakePriceSingleGoodsDialogData() {
  return {
    type: INIT_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA
  }
}

export function getMakePriceSingleGoodsDialogData({ id, MCJXSID, MRJXSID, JGZT }) {
  return {
    type: GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA,
    payload: {
      id,             // 商品id
      MCJXSID,        // 卖出经销商id
      MRJXSID,        // 买入经销商id
      JGZT            // 价格状态
    }
  }
}

export function initDeleteMakePriceSingleGoodsDialogData() {
  return {
    type: INIT_DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA
  }
}

export function deleteMakePriceSingleGoodsDialogData(id) {
  return {
    type: DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA,
    payload: {
      id              // 商品价格GUID
    }
  }
}

export function initGetMakePriceSingleGoodsLineChartData() {
  return {
    type: INIT_GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA
  }
}

export function getMakePriceSingleGoodsLineChartData({ id, MCJXSID, MRJXSID }) {
  return {
    type: GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA,
    payload: {
      id,             // 商品id
      MCJXSID,        // 卖出经销商id
      MRJXSID         // 买入经销商id
    }
  }
}


export const actions = {
  getMakePriceSingleGoodsDialogData,
  initMakePriceSingleGoodsDialogData,
  deleteMakePriceSingleGoodsDialogData,
  initDeleteMakePriceSingleGoodsDialogData,
  getMakePriceSingleGoodsLineChartData,
  initGetMakePriceSingleGoodsLineChartData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA]: (state, action) => Object.assign({}, state, {
    getChartDataStatus: '0', // '0'表示init状态 '1'表示成功状态 '2'表示失败状态 获取价格趋势数据
    xAxisChartData: [],   // chart xAxis data
    seriesChartData: []   // chart series data
  }),
  [GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    getChartDataStatus: '1',
    xAxisChartData: action.xAxisChartResponse,
    seriesChartData: action.seriesChartResponse
  }),
  [GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    getChartDataStatus: '2'
  }),
  [INIT_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA]: (state, action) => Object.assign({}, state, {
    getStatus: '0',       // '0'表示init状态 '1'表示成功状态 '2'表示失败状态
    pastGoodsData: [],
    nowGoodsData: [],
    futureGoodsData: []
  }),
  [GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_SUCCESS]: (state, action) => {
    const successObj = {
      getStatus: '1',
      pastGoodsData: [],
      nowGoodsData: [],
      futureGoodsData: []
    };
    switch (action.responseObject.JGZT) {
      case 'past':
        successObj.pastGoodsData = action.responseObject.data;
        break;
      case 'now':
        successObj.nowGoodsData = action.responseObject.data;
        break;
      case 'future':
        successObj.futureGoodsData = action.responseObject.data;
        break;
      default:
        break;
    }
    return Object.assign({}, state, successObj);
  },
  [GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    getStatus: '2'
  }),
  [INIT_DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA]: (state, action) => Object.assign({}, state, {
    deleteStatus: '0',
    deleteId: -1
  }),
  [DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    deleteStatus: '1',
    deleteId: action.response.id
  }),
  [DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    deleteStatus: '2'
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  getStatus: '0',       // '0'表示init状态 '1'表示成功状态 '2'表示失败状态 获取数据
  pastGoodsData: [],
  nowGoodsData: [],
  futureGoodsData: [],
  deleteStatus: '0',    // '0'表示init状态 '1'表示成功状态 '2'表示失败状态 删除数据
  deleteId: -1,         // 被删除的商品价格GUID
  getChartDataStatus: '0', // '0'表示init状态 '1'表示成功状态 '2'表示失败状态 获取价格趋势数据
  xAxisChartData: [],   // chart xAxis data
  seriesChartData: []   // chart series data
};
export default function makePriceSingleGoodsDialogReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
