/**
 * surgeryReturnOrderLogistics
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
export const SET_SELECTED_RETURN_ORDER_LOGISTICS = 'SET_SELECTED_RETURN_ORDER_LOGISTICS'

export function setSelectedReturnOrderLogistics(checkedOrdersArray) {
  return {
    type: SET_SELECTED_RETURN_ORDER_LOGISTICS,
    checkedOrdersArray
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_SELECTED_RETURN_ORDER_LOGISTICS]: (state, action) => ({
    ...state,
    checkedOrdersArray: action.checkedOrdersArray
  })
}

export default function selectedReturnOrderLogisticsReducer(state = { checkedOrdersArray: [] }, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
