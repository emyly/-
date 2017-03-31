// ------------------------------------
// Constants
// ------------------------------------
export const GET_GATHERINGEDDETAIL_DATA = 'GET_GATHERINGEDDETAIL_DATA'
export const GET_GATHERINGEDDETAIL_DATA_SUCCESS = 'GET_BILLINGEDDETAIL_DATA_SUCCESS'
export const GET_GATHERINGEDDETAIL_DATA_FAIL = 'GET_GATHERINGEDDETAIL_DATA'
export const GET_UNGATHERINGDETAIL_DATA = 'GET_UNGATHERINGDETAIL_DATA'
export const GET_UNGATHERINGDETAIL_DATA_SUCCESS = 'GET_UNGATHERINGDETAIL_DATA_SUCCESS'
export const GET_UNGATHERINGDETAIL_DATA_FAIL = 'GET_UNGATHERINGDETAIL_DATA_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function getGatheringedDetail(id) {
  return {
    type: GET_GATHERINGEDDETAIL_DATA,
    payload: {
      id
    }
  }
}

export function getUngatheringDetail(id) {
  return {
    type: GET_UNGATHERINGDETAIL_DATA,
    payload: {
      id
    }
  }
}

export const actions = {
  getGatheringedDetail,
  getUngatheringDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_GATHERINGEDDETAIL_DATA]: (state, action) => state,
  [GET_GATHERINGEDDETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    gatheringData: action.response
  }),
  [GET_GATHERINGEDDETAIL_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
  [GET_UNGATHERINGDETAIL_DATA]: (state, action) => state,
  [GET_UNGATHERINGDETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    unGatheringData: action.response
  }),
  [GET_UNGATHERINGDETAIL_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  gatheringData: [],
  unGatheringData: []
}

export default function gatheringDetailTableReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
