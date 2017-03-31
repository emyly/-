/**
 * Created by sjf on 2016/11/2.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_ORDER_DATA = 'GET_ORDER_DATA';
export const GET_ORDER_DATA_SUCCESS = 'GET_ORDER_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getOderData(id, type) {
  return {
    type: GET_ORDER_DATA,
    payload: {
      id,
      type
    }
  }
}

export const actions = {
  getOderData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ORDER_DATA]: (state, action) => state,
  [GET_ORDER_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    orderData: action.response
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  orderData: []
};

export default function orderSelectReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
