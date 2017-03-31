/**
 * firstClassSelection
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
export const FETCH_FIRST_CLASS_SELECTION = 'FETCH_FIRST_CLASS_SELECTION'
export const FETCH_FIRST_CLASS_SELECTION_SUCCESS = 'FETCH_FIRST_CLASS_SELECTION_SUCCESS'
export const FETCH_FIRST_CLASS_SELECTION_FAIL = 'FETCH_FIRST_CLASS_SELECTION_FAIL'

export function fetchFirstClassSelection({ contractType, businessLineId, brandId, authorizeOrgId, authorizedOrgId }) {
  return {
    type: FETCH_FIRST_CLASS_SELECTION,
    payload: {
      contractType,
      businessLineId,
      brandId,
      authorizeOrgId,
      authorizedOrgId
    }
  }
}

export function fetchFirstClassSelectionSuccess(selectorList) {
  return {
    type: FETCH_FIRST_CLASS_SELECTION_SUCCESS,
    selectorList
  }
}

export function fetchFirstClassSelectionFail() {
  return {
    type: FETCH_FIRST_CLASS_SELECTION_FAIL
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_FIRST_CLASS_SELECTION]: (state, action) => ({
    ...state,
    isFetching: true
  }),

  [FETCH_FIRST_CLASS_SELECTION_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    selectorList: action.selectorList
  }),

  [FETCH_FIRST_CLASS_SELECTION_FAIL]: (state, action) => ({
    ...state,
    isFetching: false
  })
}

const initialState = {
  isFetching: false
}

export default function firstClassSelectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
