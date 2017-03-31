/**
 * authorizationSelectionGoods
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
export const FETCH_AUTHORIZATION_SELECTION_GOODS = 'FETCH_AUTHORIZATION_SELECTION_GOODS'
export const FETCH_AUTHORIZATION_SELECTION_GOODS_SUCCESS = 'FETCH_AUTHORIZATION_SELECTION_GOODS_SUCCESS'
export const FETCH_AUTHORIZATION_SELECTION_GOODS_FAIL = 'FETCH_AUTHORIZATION_SELECTION_GOODS_FAIL'

export function fetchAuthorizationSelectionGoods({
  contractType, businessLineId, brandId, firstClassId, secondClassId, thirdClassId, authorizeOrgId, authorizedOrgId
}) {
  return {
    type: FETCH_AUTHORIZATION_SELECTION_GOODS,
    payload: {
      contractType,
      businessLineId,
      brandId,
      firstClassId,
      secondClassId,
      thirdClassId,
      authorizeOrgId,
      authorizedOrgId
    }
  }
}

export function fetchAuthorizationSelectionGoodsSuccess(authGoods) {
  return {
    type: FETCH_AUTHORIZATION_SELECTION_GOODS_SUCCESS,
    authGoods
  }
}

export function fetchAuthorizationSelectionGoodsFail() {
  return {
    type: FETCH_AUTHORIZATION_SELECTION_GOODS_FAIL
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_AUTHORIZATION_SELECTION_GOODS]: (state, action) => ({
    ...state,
    isFetching: true
  }),

  [FETCH_AUTHORIZATION_SELECTION_GOODS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    authGoods: action.authGoods
  }),

  [FETCH_AUTHORIZATION_SELECTION_GOODS_FAIL]: (state, action) => ({
    ...state,
    isFetching: false
  })
}

const initialState = {
  isFetching: false
}

export default function authorizationSelectionGoodsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
