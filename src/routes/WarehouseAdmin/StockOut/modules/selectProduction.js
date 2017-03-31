/**
 * Created by wangming on 11/16/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
import { GET_SELECT_MATCH_DATA } from './selectingGoods'
export const GET_SELECT_ADVICE_DATA = 'GET_SELECT_ADVICE_DATA';
export const GET_SELECT_ADVICE_DATA_SUCCESS = 'GET_SELECT_ADVICE_DATA_SUCCESS';
export const GET_SELECT_ADVICE_DATA_FAIL = 'GET_SELECT_ADVICE_DATA_FAIL';
export const GET_OHTHER_STORAGE_DATA = 'GET_OHTHER_STORAGE_DATA';
export const GET_OHTHER_STORAGE_DATA_SUCCESS = 'GET_OHTHER_STORAGE_DATA_SUCCESS';
export const GET_OHTHER_STORAGE_DATA_FAIL = 'GET_OHTHER_STORAGE_DATA_FAIL';
export const GET_SELECT_TABLE_ROW_LIST = 'GET_SELECT_TABLE_ROW_LIST';
export const GET_SELECT_TABLE_ROW_LIST_SUCCESS = 'GET_SELECT_TABLE_ROW_LIST_SUCCESS';
export const GET_SELECT_TABLE_ROW_LIST_FAIL = 'GET_SELECT_TABLE_ROW_LIST_FAIL';
// ------------------------------------
// Actions
// ------------------------------------


// ------------------------------------
// Constants
// ------------------------------------
export const GET_TABLE_SELECT_DATA = 'GET_TABLE_SELECT_DATA';

// ------------------------------------
// Actions
// ------------------------------------
export function getSelectTableRowList(rowData) {
  return {
    type: GET_SELECT_TABLE_ROW_LIST,
    payload: rowData
  };
}

export function getTableData(tableData) {
  console.debug('getWarehouseInOutGoodsSummary: 1:', tableData);
	// return {
	// 	type: GET_SELECT_MATCH_DATA,
	// 	payload: data
  return (dispatch) => {
    dispatch(
      {
        type: GET_TABLE_SELECT_DATA,
        tableData
      }
		)
  };
	// }
}

export function getSelectAdvice(orderId, params) {
  console.debug('getWarehouseInOutGoodsSummary: 1');
  return {
    type: GET_SELECT_ADVICE_DATA,
    payload: {
      id: orderId,
      body: params
    }
	// 	return (dispatch) => {
	// 		dispatch()
  };
	// }
}

export function getOtherStorage(params) {
  console.debug('getOtherStorage: 1');
  return {
    type: GET_OHTHER_STORAGE_DATA,
    payload: params
		// 	return (dispatch) => {
		// 		dispatch()
  };
	// }
}

export const actions = {
  getSelectAdvice,
  getOtherStorage
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	// [GET_SELECT_ADVICE_DATA]: (state, action) => {
	// 	return Object.assign({}, state, {
	// 		selectData: action.response
	// 	})
	// },
  [GET_SELECT_ADVICE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    selectData: action.response,
    errorData: ''
  }),
  [GET_SELECT_ADVICE_DATA_FAIL]: (state, action) => {
    console.debug('GET_SELECT_ADVICE_DATA_FAIL 22:', action)
    return Object.assign({}, state, {
      errorData: action.response,
      selectData: []
    })
  },
  [GET_OHTHER_STORAGE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    storageData: action.response,
    errorData: ''
  }),
  [GET_OHTHER_STORAGE_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response
  }),
  [GET_SELECT_TABLE_ROW_LIST_SUCCESS]: (state, action) => Object.assign({}, state, {
    rowListData: action.response,
    errorData: ''
  }),
  [GET_SELECT_TABLE_ROW_LIST_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response
  }),
  [GET_SELECT_MATCH_DATA]: (state, action) => {
    console.debug('GET_SELECT_MATCH_DATA:', action);
    return Object.assign({}, state, {
      flagBack: true
    })
  },
  [GET_TABLE_SELECT_DATA]: (state, action) => {
    console.debug('GET_SELECT_MATCH_DATA:', action);
    return Object.assign({}, state, {
      tableData: action.tableData,
      flagBack: false
    })
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  selectData: [],
  errorData: {},
  flagBack: false,
  tableData: [],
  storageData: [],
  rowListData: []
};

export default function getSelectAdviceReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
