/**
 * searchAuthorizedGoods
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
export const SEARCH_AUTHORIZED_GOODS = 'SEARCH_AUTHORIZED_GOODS'
export const SEARCH_AUTHORIZED_GOODS_SUCCESS = 'SEARCH_AUTHORIZED_GOODS_SUCCESS'
export const SEARCH_AUTHORIZED_GOODS_FAIL = 'SEARCH_AUTHORIZED_GOODS_FAIL'

export function searchAuthorizedGoods(params) {
  return {
    type: SEARCH_AUTHORIZED_GOODS,
    params
  }
}

export function searchAuthorizedGoodsSuccess(goodsList) {
  return {
    type: SEARCH_AUTHORIZED_GOODS_SUCCESS,
    goodsList
  }
}

export function searchAuthorizedGoodsFail() {
  return {
    type: SEARCH_AUTHORIZED_GOODS_FAIL
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [SEARCH_AUTHORIZED_GOODS]: (state, action) => ({
    ...state,
    isFetching: true
  }),

  [SEARCH_AUTHORIZED_GOODS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    goodsList: action.goodsList
  }),

  [SEARCH_AUTHORIZED_GOODS_FAIL]: (state, action) => ({
    ...state,
    isFetching: false
  })
}

const initialState = {
  isFetching: false,
  goodsList: []
}

export default function searchAuthorizedGoodsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
