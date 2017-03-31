// ------------------------------------
// Constants
// ------------------------------------
export const GET_REVIEW_LIST_DATA = 'ProcurementReview_GET_REVIEW_LIST_DATA'
export const GET_REVIEW_LIST_DATA_SUCCESS = 'ProcurementReview_GET_REVIEW_LIST_DATA_SUCCESS'
export const GET_REVIEW_LIST_DATA_FAIL = 'ProcurementReview_GET_REVIEW_LIST_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function getReviewList(params) {
  return {
    type: GET_REVIEW_LIST_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  getReviewList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_REVIEW_LIST_DATA]: (state, action) => state,
  [GET_REVIEW_LIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    reviewListData: action.response,
    currentPage: action.currentPage
  }),
  [GET_REVIEW_LIST_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  reviewListData: []
}

export default function reviewListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
