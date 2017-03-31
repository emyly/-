/**
 * Created by wangming on 2/14/2017.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DOOHTHER_STORAGE_DATA = 'GET_DOOHTHER_STORAGE_DATA';
export const GET_DOOHTHER_STORAGE_DATA_SUCCESS = 'GET_DOOHTHER_STORAGE_DATA_SUCCESS';
export const GET_DOOHTHER_STORAGE_DATA_FAIL = 'GET_DOOHTHER_STORAGE_DATA_FAIL';
// ------------------------------------
// Actions
// ------------------------------------
export function getOtherStorage(params) {
  return {
    type: GET_DOOHTHER_STORAGE_DATA,
    payload: params
  };
}

export const actions = {
  getOtherStorage
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DOOHTHER_STORAGE_DATA_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      storageData: action.response,
      errorData: ''
    })
  },
  [GET_DOOHTHER_STORAGE_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  otherStockData: [],
  errorData: {}
};

export default function selectOtherDialogReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

