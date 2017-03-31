/**
 * surgeryReturnReceivingRecheck
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
export const UPDATE_SURGERY_RETURN_RECEIVING_RECHECK = 'UPDATE_SURGERY_RETURN_RECEIVING_RECHECK'
export const UPDATE_SURGERY_RETURN_RECEIVING_RECHECK_SUCCESS = 'UPDATE_SURGERY_RETURN_RECEIVING_RECHECK_SUCCESS'
export const UPDATE_SURGERY_RETURN_RECEIVING_RECHECK_FAIL = 'UPDATE_SURGERY_RETURN_RECEIVING_RECHECK_FAIL'

export function updateSurgeryReturnReceivingRecheck(orderId, logisticsIds) {
  return {
    type: UPDATE_SURGERY_RETURN_RECEIVING_RECHECK,
    params: {
      DDID: orderId,
      CRKDID: logisticsIds
    }
  }
}

export function updateSurgeryReturnReceivingRecheckSuccess() {
  return {
    type: UPDATE_SURGERY_RETURN_RECEIVING_RECHECK_SUCCESS,
  }
}

export function updateSurgeryReturnReceivingRecheckFail(error) {
  return {
    type: UPDATE_SURGERY_RETURN_RECEIVING_RECHECK_FAIL,
    error
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_SURGERY_RETURN_RECEIVING_RECHECK]: (state, action) => ({
    ...state,
    succeed: false,
    isUpdating: true,
  }),

  [UPDATE_SURGERY_RETURN_RECEIVING_RECHECK_SUCCESS]: (state, action) => ({
    ...state,
    isUpdating: false,
    succeed: true,
    error: null
  }),

  [UPDATE_SURGERY_RETURN_RECEIVING_RECHECK_FAIL]: (state, action) => ({
    ...state,
    isUpdating: false,
    succeed: false,
    error: action.error
  })
}

const initialState = {
  isUpdating: false,
  succeed: false
}

export default function surgeryReturnReceivingRecheckReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
