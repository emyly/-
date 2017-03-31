import _ from 'lodash'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_ROLES_DATA = 'GET_ROLES_DATA';
export const GET_ROLES_DATA_SUCCESS = 'GET_ROLES_DATA_SUCCESS';
export const GET_ROLES_DATA_FAIL = 'GET_ROLES_DATA_FAIL';
export const DESTROY_ROLES_DATA = 'DESTROY_ROLES_DATA';

// ------------------------------------
// Actions
// ------------------------------------
export const getRoles = userId => (
  {
    type: GET_ROLES_DATA,
    payload: userId
  }
);

export const destroyRoles = userId => (
  {
    type: DESTROY_ROLES_DATA,
    payload: userId
  }
);

export const actions = {
  getRoles,
  destroyRoles
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ROLES_DATA]: (state, action) => state,
  [DESTROY_ROLES_DATA]: (state, action) =>
     Object.assign({}, state, {
       status: true,
       dataSource: [],
       checkedData: [],
     }),
  [GET_ROLES_DATA_SUCCESS]: (state, action) => {
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
  [GET_ROLES_DATA_FAIL]: (state, action) => Object.assign({}, state, {
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
