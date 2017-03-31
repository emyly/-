/**
 * Created by wrq on 2016/11/3.
 */
// 物流拣货记录
export const GET_PICKING_R_DATA = 'GET_PICKING_R_DATA';
export const GET_PICKING_R_DATA_SUCCESS = 'GET_PICKING_R_DATA_SUCCESS';
export const GET_PICKING_R_DATA_FAIL = 'GET_PICKING_R_DATA_FAIL'

// Action
export function getPickingRecordDate(id, type) {
  return {
    type: GET_PICKING_R_DATA,
    payload: {
      id,
      type
    }
  }
}
export const actions = {
  getPickingRecordDate
};
const ACTION_HANDLERS = {
  [GET_PICKING_R_DATA]: (state, actions) => state,
  [GET_PICKING_R_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    pickingRecordDate: action.response
  }),
  [GET_PICKING_R_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    pickingRecordDate: action.response
  })
};
// reducer
const initState = {
  pickingRecordDate: []
};
export default function atSelectReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
