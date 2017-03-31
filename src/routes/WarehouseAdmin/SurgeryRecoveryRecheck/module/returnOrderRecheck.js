/**
 * returnOrderRecheck
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
import Constant from 'lib/constant'

export const UPDATE_RETURN_ORDER_RECHECK_STATUS = 'UPDATE_RETURN_ORDER_RECHECK_STATUS'
export const UPDATE_RETURN_ORDER_RECHECK_STATUS_SUCCESS = 'UPDATE_RETURN_ORDER_RECHECK_STATUS_SUCCESS'
export const UPDATE_RETURN_ORDER_RECHECK_STATUS_FAIL = 'UPDATE_RETURN_ORDER_RECHECK_STATUS_FAIL'

export function updateReturnOrderRecheck(logisticsIds, checkStatus, orderId, message = '', messageReceivers = []) {
  return {
    type: UPDATE_RETURN_ORDER_RECHECK_STATUS,
    params: {
      CRKDSHB: logisticsIds.map(lgId => (
        {
          CKRK: Constant.SAAS.CRK.ENTER_STOCK,
          CRKDID: lgId,
          SHZT: checkStatus
        }
      )),
      DDB: {
        GUID: orderId,
        DDLX: Constant.SAAS.CRK.SURGICAL_ORDER,
      },
      TZ: {
        TZNR: message,
        BTZR: messageReceivers,
      }
    },
    checkStatus
  }
}

export function updateReturnOrderRecheckSuccess(result) {
  return {
    type: UPDATE_RETURN_ORDER_RECHECK_STATUS_SUCCESS,
    goodsList: result.Result.CRKMXB
  }
}

export function updateReturnOrderRecheckFail(error) {
  return {
    type: UPDATE_RETURN_ORDER_RECHECK_STATUS_FAIL,
    error
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_RETURN_ORDER_RECHECK_STATUS]: (state, action) => ({
    ...state,
    isUpdating: true
  }),

  [UPDATE_RETURN_ORDER_RECHECK_STATUS_SUCCESS]: (state, action) => ({
    ...state,
    isUpdating: false,
    goodsList: action.goodsList || [],
    error: null
  }),

  [UPDATE_RETURN_ORDER_RECHECK_STATUS_FAIL]: (state, action) => ({
    ...state,
    isUpdating: false,
    error: action.error
  })
}

const initialState = {
  isUpdating: false,
  goodsList: []
}

export default function returnOrderRecheckReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
