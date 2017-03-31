/**
 * Created by qyf on 2016/11/5.
 */
// 历次入库记录
export const GET_HISTORY_W_DATA = 'GET_HISTORY_W_DATA';
export const GET_HISTORY_W_DATA_SUCCESS = 'GET_HISTORY_W_DATA_SUCCESS';
export const GET_HISTORY_W_DATA_FAIL = 'GET_HISTORY_W_DATA_FAIL';

export function getHistoryWarehousing(id, body) {
  return {
    type: GET_HISTORY_W_DATA,
    payload: {
      id,
      body
    }
  }
}
export const actions = {
  getHistoryWarehousing
};
const ACTION_HANDLERS = {
  [GET_HISTORY_W_DATA]: (state, actions) => state,
  [GET_HISTORY_W_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    historyWarehousingDate: action.response
  }),
  [GET_HISTORY_W_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  })
};
const initState = {
  historyWarehousingDate: []
};
export default function historyWarehousingReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
