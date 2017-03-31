// ------------------------------------
// Constants
// ------------------------------------
export const POST_REVIEW = 'procurementReviewDetail_POST_REVIEW'
export const POST_REVIEW_SUCCESS = 'procurementReviewDetail_POST_REVIEW_SUCCESS'
export const POST_ERROR = 'procurementReviewDetail_POST_ERROR'
export const INIT_STORE = 'procurementReviewDetail_INIT_STORE'
// ------------------------------------
// Actions
// ------------------------------------
export function postReview(id, SHZT, SHYJ, TZNR, BTZR) {
  return {
    type: POST_REVIEW,
    payload: { id, SHZT, SHYJ, TZNR, BTZR }
  }
}

export function initStore() {
  return {
    type: INIT_STORE
  }
}

export const actions = {
  postReview,
  initStore
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POST_REVIEW]: (state, action) => state,
  [POST_REVIEW_SUCCESS]: (state, action) => Object.assign({}, state, {
    result: action.response
  }),
  [POST_ERROR]: (state, action) => state,
  [INIT_STORE]: (state, action) => Object.assign({}, state, {
    result: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  result: false
}

export default function procurementReviewDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
