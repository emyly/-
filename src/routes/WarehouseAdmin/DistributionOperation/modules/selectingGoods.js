/**
 * Created by wangming on 11/16/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_DO_DATA = 'CREATE_DO_DATA';
export const CREATE_DO_DATA_SUCCESS = 'CREATE_DO_DATA_SUCCESS';
export const CREATE_DO_DATA_FAIL = 'CREATE_DO_DATA_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function createOutStockData(params) {
  return {
    type: CREATE_DO_DATA,
    payload: params
  };
}

export const actions = {
  createOutStockData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_DO_DATA_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      outStockData: action.response
    })
  },
  [CREATE_DO_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  outStockData: {},
  errorData: {}
};

export default function createOutStockDataReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

