/**
 * Created by wangming on 11/18/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------

export const GET_DOTEMPORARY_DATA = 'GET_DOTEMPORARY_DATA';
export const GET_DOTEMPORARY_DATA_SUCCESS = 'GET_DOTEMPORARY_DATA_SUCCESS';
export const GET_DOTEMPORARY_DATA_FAIL = 'GET_DOTEMPORARY_DATA_FAIL';
export const GET_DOSELECT_ADVICE_DATA = 'GET_DOSELECT_ADVICE_DATA';
export const GET_DOSELECT_ADVICE_DATA_SUCCESS = 'GET_DOSELECT_ADVICE_DATA_SUCCESS';
export const GET_DOSELECT_ADVICE_DATA_FAIL = 'GET_DOSELECT_ADVICE_DATA_FAIL';

export function getTemporaryStorage(orderId) {
  return {
    type: GET_DOTEMPORARY_DATA,
    payload: orderId
  };
}

export function getSelectAdvice(orderId, params) {
  return {
    type: GET_DOSELECT_ADVICE_DATA,
    payload: {
      id: orderId,
      body: params
    }
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
  [GET_DOSELECT_ADVICE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    selectData: action.response,
    errorData: {}
  }),
  [GET_DOSELECT_ADVICE_DATA_FAIL]: (state, action) => {
    return Object.assign({}, state, {
      errorData: action.response,
      selectData: []
    })
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  errorData: {},
  temporaryData: [],
  selectData: [],
};

export default function selectMethodFlowReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
