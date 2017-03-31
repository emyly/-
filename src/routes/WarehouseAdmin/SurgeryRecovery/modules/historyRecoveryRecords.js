/**
 * Created by liuyali on 2016/11/24.
 */

export const HISTORY_RECOVERY_RECORDS = 'HISTORY_RECOVERY_RECORDS';
export const HISTORY_RECOVERY_RECORDS_SUCCESS = 'HISTORY_RECOVERY_RECORDS_SUCCESS';
export const HISTORY_RECOVERY_RECORDS_ERROR = 'HISTORY_RECOVERY_RECORDS_ERROR';

export function historyRecoveryRecords(id) {
  return {
    type: HISTORY_RECOVERY_RECORDS,
    id
  }
}

const ACTION_HANDLERS = {
  [HISTORY_RECOVERY_RECORDS_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.response
  }),
  [HISTORY_RECOVERY_RECORDS_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error
  }),
};

const initialState = {
  status: false,
  data: []
}

export default function historyRecoveryRecordsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
