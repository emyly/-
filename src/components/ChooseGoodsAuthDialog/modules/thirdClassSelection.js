/**
 * thirdClassSelection
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
export const FETCH_THIRD_CLASS_SELECTION = 'FETCH_THIRD_CLASS_SELECTION'
export const FETCH_THIRD_CLASS_SELECTION_SUCCESS = 'FETCH_THIRD_CLASS_SELECTION_SUCCESS'
export const FETCH_THIRD_CLASS_SELECTION_FAIL = 'FETCH_THIRD_CLASS_SELECTION_FAIL'

export function fetchThirdClassSelection({
  contractType, businessLineId, brandId, firstClassId, secondClassId, authorizeOrgId, authorizedOrgId
}) {
  return {
    type: FETCH_THIRD_CLASS_SELECTION,
    payload: {
      contractType,
      businessLineId,
      brandId,
      firstClassId,
      secondClassId,
      authorizeOrgId,
      authorizedOrgId
    }
  }
}

export function fetchThirdClassSelectionSuccess(selectorList) {
  return {
    type: FETCH_THIRD_CLASS_SELECTION_SUCCESS,
    selectorList
  }
}

export function fetchThirdClassSelectionFail() {
  return {
    type: FETCH_THIRD_CLASS_SELECTION_FAIL
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_THIRD_CLASS_SELECTION]: (state, action) => ({
    ...state,
    isFetching: true
  }),

  [FETCH_THIRD_CLASS_SELECTION_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    selectorList: action.selectorList
  }),

  [FETCH_THIRD_CLASS_SELECTION_FAIL]: (state, action) => ({
    ...state,
    isFetching: false
  })
}

const initialState = {
  isFetching: false
}

export default function thirdClassSelectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
