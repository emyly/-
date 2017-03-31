/**
 * Created by wangming on 11/16/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const SET_TEMPORARY_STORAGE = 'SET_TEMPORARY_STORAGE';
export const SET_TEMPORARY_STORAGE_SUCCESS = 'SET_TEMPORARY_STORAGE_SUCCESS';
export const SET_TEMPORARY_STORAGE_FAIL = 'SET_TEMPORARY_STORAGE_FAIL';

// ------------------------------------
// Actions
// ------------------------------------


// ------------------------------------
// Constants
// ------------------------------------


export function setTemporaryStorage(params) {
  return {
    type: SET_TEMPORARY_STORAGE,
    payload: params
  }
}

export const actions = {
  setTemporaryStorage,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_TEMPORARY_STORAGE_SUCCESS]: (state, action) => Object.assign({}, state, {
    resultState: true
  }),
  [SET_TEMPORARY_STORAGE_FAIL]: (state, action) => Object.assign({}, state, {
    errorData: action.response,
    resultState: false
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  resultState: true,
  errorData: {},
};

export default function temporaryStorageReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
