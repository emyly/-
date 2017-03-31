/**
 * setChoosedAuthGoods
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 * Note: This module is used to transfer data between different components
 */
export const SET_CHOOSED_AUTH_GOODS = 'SET_CHOOSED_AUTH_GOODS'
export const INIT_STORE = 'CHOOSED_AUTH_GOODS_INIT_STORE'

export function setChoosedAuthGoods(choosedGoods) {
  return {
    type: SET_CHOOSED_AUTH_GOODS,
    choosedGoods
  }
}

export function initStore() {
  return { type: INIT_STORE }
}

const initialState = {
  choosedGoods: []
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_CHOOSED_AUTH_GOODS]: (state, action) => ({
    ...state,
    choosedGoods: action.choosedGoods
  }),
  [INIT_STORE]: (state) => ({
    ...state,
    choosedGoods: []
  })
}

export default function setChoosedAuthGoodsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
