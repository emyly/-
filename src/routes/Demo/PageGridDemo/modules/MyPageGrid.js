// ------------------------------------
// Constants
// ------------------------------------
export const PAGE_GRID_GET_DATA = 'PAGE_GRID_GET_DATA';
export const PAGE_GRID_GET_DATA_SUCCESS = 'PAGE_GRID_GET_DATA_SUCCESS';
export const PAGE_GRID_GET_DATA_ERROR = 'PAGE_GRID_GET_DATA_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
export function loadUserList(page = 1) {
  return {
    type: PAGE_GRID_GET_DATA,
    payload: {
      value: page,
    },
  };
}

export const actions = {
  loadUserList,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PAGE_GRID_GET_DATA]: (state, action) => state,
  [PAGE_GRID_GET_DATA_SUCCESS]: (state, action) => Object.assign({}, state.data, {
    status: true,
    data: action.response.Result.YHB,
    currentPage: action.cPage || 1,
    total: action.response.Result.Total,
  }),
  [PAGE_GRID_GET_DATA_ERROR]: (state, action) => Object.assign({}, state.data, {
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

export default function myReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
