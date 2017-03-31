/**
 * Created by wangming on 11/16/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
import { GET_SELECT_MATCH_DATA } from './selectingGoods';
import {
  GET_DOTEMPORARY_DATA,
  GET_DOTEMPORARY_DATA_SUCCESS,
  GET_DOTEMPORARY_DATA_FAIL,
} from './stockOutDetailBeforeSelect';


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

export function getTemporaryStorage(orderId) {
  return {
    type: GET_DOTEMPORARY_DATA,
    payload: orderId
  };
}

export function getSelectTableRowList(rowData) {
  return {
    type: GET_SELECT_TABLE_ROW_LIST,
    payload: rowData
  };
}

export function getTableData(tableData) {
  return (dispatch) => {
    dispatch(
      {
        type: GET_TABLE_SELECT_DATA,
        tableData
      }
    )
  };
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

  [GET_SELECT_TABLE_ROW_LIST_SUCCESS]: (state, action) => Object.assign({}, state, {
    rowListData: action.response,
    errorData: ''
  }),
  [GET_SELECT_TABLE_ROW_LIST_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response
  }),
  [GET_SELECT_MATCH_DATA]: (state, action) => Object.assign({}, state, {
    flagBack: true
  }),
  [GET_TABLE_SELECT_DATA]: (state, action) => Object.assign({}, state, {
    tableData: action.tableData,
    flagBack: false
  }),
  [GET_DOTEMPORARY_DATA_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      temporaryData: action.response,
      errorData: {}
    })
  },
  [GET_DOTEMPORARY_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response,
    temporaryData: [],
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  errorData: {},
  flagBack: false,
  tableData: [],
  rowListData: [],
  temporaryData: []
};

export default function getSelectAdviceReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
