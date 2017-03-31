import _ from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_AUTHORITY_DATA = 'GET_AUTHORITY_DATA';
export const GET_AUTHORITY_DATA_SUCCESS = 'GET_AUTHORITY_DATA_SUCCESS';
export const GET_AUTHORITY_DATA_FAIL = 'GET_AUTHORITY_DATA_FAIL';
export const DESTORY_AUTHORITY_DATA = 'DESTORY_AUTHORITY_DATA';

// ------------------------------------
// Actions
// ------------------------------------
export const getAuthority = jsId => (
  {
    type: GET_AUTHORITY_DATA,
    payload: jsId
  }
);

export const destoryAuthority = jsId => (
  {
    type: DESTORY_AUTHORITY_DATA,
    payload: jsId
  }
);

export const actions = {
  getAuthority,
  destoryAuthority
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_AUTHORITY_DATA]: (state, action) => state,
  [DESTORY_AUTHORITY_DATA]: (state, action) =>
    Object.assign({}, state, {
      status: true,
      dataSource: [],
      checkedData: [],
    }),
  [GET_AUTHORITY_DATA_SUCCESS]: (state, action) => {
    if (_.isNil(action.payload)) {
      return Object.assign({}, state, {
        status: true,
        dataSource: action.response
      })
    }
    return Object.assign({}, state, {
      status: true,
      checkedData: action.response
    })
  },
  [GET_AUTHORITY_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  dataSource: [],
  checkedData: []
}

export default function myReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
