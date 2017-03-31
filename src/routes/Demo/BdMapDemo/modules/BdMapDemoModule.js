// ------------------------------------
// Constants
// ------------------------------------
export const GET_DATA = 'BdMapDemo.GET_DATA';
export const GET_DATA_SUCCESS = 'BdMapDemo.GET_DATA_SUCCESS';
export const GET_DATA_ERROR = 'BdMapDemo.GET_DATA_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchRemoteData() {
  return {
    type: GET_DATA,
  };
}

export const actions = {
  fetchRemoteData,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => state,
  [GET_DATA_SUCCESS]: (state, action) => Object.assign({}, state.data, {
    status: true,
    data: action.response.Result.JSB,
    checkedData: action.response.Result.JSB2,
  }),
  [GET_DATA_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  status: false,
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
