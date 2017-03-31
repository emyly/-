/**
 * Created by wrq on 2016/11/3.
 */
// 物流详情列表
export const GET_LOGISTICS_R_DATA = 'GET_LOGISTICS_R_DATA';
export const GET_LOGISTICS_R_DATA_SUCCESS = 'GET_LOGISTICS_R_DATA_SUCCESS';
export const GET_LOGISTICS_R_DATA_FAIL = 'GET_LOGISTICS_R_DATA_FAIL'

// Actions
export function getLogisticsRecordDate(id, type) {
  return {
    type: GET_LOGISTICS_R_DATA,
    payload: {
      id,
      type
    }
  }
}
export const actions = {
  getLogisticsRecordDate
};
const ACTION_HANDLERS = {
  [GET_LOGISTICS_R_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    logisticsRecordDate: action.response
  }),
  [GET_LOGISTICS_R_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: 'error',
    error: action.error
  })
};
// Reducer
const initState = {
  logisticsRecordDate: []
};
export default function logRecordReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
