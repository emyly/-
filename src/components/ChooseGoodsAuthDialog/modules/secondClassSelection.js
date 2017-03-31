/**
 * secondClassSelection
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
export const FETCH_SECOND_CLASS_SELECTION = 'FETCH_SECOND_CLASS_SELECTION'
export const FETCH_SECOND_CLASS_SELECTION_SUCCESS = 'FETCH_SECOND_CLASS_SELECTION_SUCCESS'
export const FETCH_SECOND_CLASS_SELECTION_FAIL = 'FETCH_SECOND_CLASS_SELECTION_FAIL'

export function fetchSecondClassSelection({
  contractType, businessLineId, brandId, firstClassId, authorizeOrgId, authorizedOrgId
}) {
  return {
    type: FETCH_SECOND_CLASS_SELECTION,
    payload: {
      contractType,
      businessLineId,
      brandId,
      firstClassId,
      authorizeOrgId,
      authorizedOrgId
    }
  }
}

export function fetchSecondClassSelectionSuccess(selectorList) {
  return {
    type: FETCH_SECOND_CLASS_SELECTION_SUCCESS,
    selectorList
  }
}

export function fetchSecondClassSelectionFail() {
  return {
    type: FETCH_SECOND_CLASS_SELECTION_FAIL
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SECOND_CLASS_SELECTION]: (state, action) => ({
    ...state,
    isFetching: true
  }),

  [FETCH_SECOND_CLASS_SELECTION_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    selectorList: action.selectorList
  }),

  [FETCH_SECOND_CLASS_SELECTION_FAIL]: (state, action) => ({
    ...state,
    isFetching: false
  })
}

const initialState = {
  isFetching: false
}

export default function secondClassSelectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
