// ------------------------------------
// Constants
// ------------------------------------
export const GET_PRE_MATCHING_DATA = 'GET_PRE_MATCHING_DATA';
export const GET_PRE_MATCHING_DATA_SUCCESS = 'GET_PRE_MATCHING_DATA_SUCCESS';
export const GET_PRE_MATCHING_DATA_FAIL = 'GET_PRE_MATCHING_DATA_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function getPrematchingData(params) {
  return {
    type: GET_PRE_MATCHING_DATA,
    payload: params
  }
}

export const actions = {
  getPrematchingData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PRE_MATCHING_DATA]: (state, action) => state,
  [GET_PRE_MATCHING_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    preMatchData: action.response,
    errorData: '',
  }),
  [GET_PRE_MATCHING_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    preMatchData: [],
    errorData: action.response.response.Message,
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  preMatchData: [],
  errorData: '',
};

export default function getPrematchingDataReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
