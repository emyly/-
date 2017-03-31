/**
 * Created by liuyali on 2016/11/17.
 */
/**
 * Created by liuyali on 2016/11/17.
 */
export const CHECK_IN_PROFITLOSS = 'CHECK_IN_PROFITLOSS';
export const CHECK_IN_PROFITLOSS_SUCCESS = 'CHECK_IN_PROFITLOSS_SUCCESS';
export const CHECK_IN_PROFITLOSS_ERROR = 'CHECK_IN_PROFITLOSS_ERROR';

export const GET_END_INVENTORY_RECORDS = 'GET_END_INVENTORY_RECORDS';
export const GET_END_INVENTORY_RECORDS_SUCCESS = 'GET_END_INVENTORY_RECORDS_SUCCESS';
export const GET_END_INVENTORY_RECORDS_ERROR = 'GET_END_INVENTORY_RECORDS_ERROR';

export const CLEAR_CHECK_IN_PROFITLOSS_STORE = 'CLEAR_CHECK_IN_PROFITLOSS_STORE';

export function checkInProfitLoss(params) {
  return {
    type: CHECK_IN_PROFITLOSS,
    payload: {
      ...params
    }
  }
}

export function clearStore() {
  return {
    type: CLEAR_CHECK_IN_PROFITLOSS_STORE,
  }
}


export function getEndInventoryRecords() {
  return {
    type: GET_END_INVENTORY_RECORDS
  }
}


const ACTION_HANDLERS = {
  [CHECK_IN_PROFITLOSS_SUCCESS]: (state, action) => Object.assign({}, state, {
    checkInStatus: true,
  }),
  [CHECK_IN_PROFITLOSS_ERROR]: (state, action) => Object.assign({}, state, {
    checkInStatus: false,
    error: action.error
  }),
  [GET_END_INVENTORY_RECORDS_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.response
  }),
  [GET_END_INVENTORY_RECORDS_ERROR]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.error
  }),
  [CLEAR_CHECK_IN_PROFITLOSS_STORE]: (state, action) => Object.assign({}, state, {
    checkInStatus: false,
    status: false,
    data: []
  }),

};

const initialState = {
  checkInStatus: false,
  status: false,
  data: []
}


export default function checkInProfitLossReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
