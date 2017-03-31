export const GET_CURRENCY_DATA = 'GET_CURRENCY_DATA';
export const GET_CURRENCY_DATA_SUCCESS = 'GET_CURRENCY_DATA_SUCCESS';
export const GET_CURRENCY_DATA_FAIL = 'GET_CURRENCY_DATA_FAIL';

// Actions
export function getCurrency() {
  return {
    type: GET_CURRENCY_DATA
  }
}

export const actions = {
  getCurrency
};

const ACTION_HANDLERS = {
  [GET_CURRENCY_DATA]: (state, actions) => state,
  [GET_CURRENCY_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    currencyData: action.response
  }),
  [GET_CURRENCY_DATA_FAIL]: (state, action) => state
};
// Reducer
const initState = {
  currencyData: []
};
export default function currencySelectReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
