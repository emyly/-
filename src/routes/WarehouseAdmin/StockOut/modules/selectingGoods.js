/**
 * Created by wangming on 11/16/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_OUTSTOCK_DATA = 'CREATE_OUTSTOCK_DATA';
export const CREATE_OUTSTOCK_DATA_SUCCESS = 'CREATE_OUTSTOCK_DATA_SUCCESS';
export const CREATE_OUTSTOCK_DATA_FAIL = 'CREATE_OUTSTOCK_DATA_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function createOutStockData(params) {
  console.debug('createOutStockData: 1');
  return {
    type: CREATE_OUTSTOCK_DATA,
    payload: params
  };
	// }
}

export const actions = {
  createOutStockData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_OUTSTOCK_DATA_SUCCESS]: (state, action) => {
    console.debug('createOutStockData: 2', action);
    return Object.assign({}, state, {
      outStockData: action.response
    })
  },
  [CREATE_OUTSTOCK_DATA_FAIL]: (state, action) => Object.assign({}, state, {
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

