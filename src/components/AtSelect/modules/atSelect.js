/**
 * Created by qyf on 2016/11/2.
 */
// 选择谁
export const GET_SELECT_DATA = 'GET_SELECT_DATA';
export const GET_SELECT_SUCCESS = 'GET_SELECT_SUCCESS';
export const GET_SELECT_DATA_FAIL = 'GET_SELECT_DATA_FAIL';

// Actions
export function getAtSelectDate(organizationId) {
  return {
    type: GET_SELECT_DATA,
    payload: {
      organizationId
    }
  }
}

export const actions = {
  getAtSelectDate
};

const ACTION_HANDLERS = {
  [GET_SELECT_DATA]: (state, actions) => state,
  [GET_SELECT_SUCCESS]: (state, action) => Object.assign({}, state, {
    atSelectData: action.response
  }),
  [GET_SELECT_DATA_FAIL]: (state, action) => state
};
// Reducer
const initState = {
  atSelectData: []
};
export default function atSelectReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
