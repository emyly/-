/**
 * Created by liuyali on 2016/11/3.
 */

export const GET_BILLSMR_DATA = 'GET_BILLSMR_DATA';
export const GET_BILLSMR_DATA_SUCCESS = 'GET_BILLSMR_DATA_SUCCESS';
export const GET_BILLSMR_DATA_ERROR = 'GET_BILLSMR_DATA_ERROR';

export function getBillSmmryData(ddid) {
  return {
    type: GET_BILLSMR_DATA,
    payload: {
      ddid
    }
  }
}

export function getBillSmmryDataSuccess(resultArray) {
  return {
    type: GET_BILLSMR_DATA_SUCCESS,
    response: resultArray || {}
  }
}

export function getBillSmmryDataError(error) {
  return {
    type: GET_BILLSMR_DATA_ERROR,
    error
  }
}

const ACTION_HANDLERS = {
  [GET_BILLSMR_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.response
  }),
  [GET_BILLSMR_DATA_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: false,
    data: action.error
  }),
}

const initialState = {
  data: []
}

export default function getBillSmmryDataReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
