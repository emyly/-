/**
 * Created by NXQ on 11/4/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DEPOSIT_IMPREST_DATA = 'GET_DEPOSIT_IMPREST_DATA';
export const GET_DEPOSIT_IMPREST_DATA_SUCCESS = 'GET_DEPOSIT_IMPREST_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getDepositImprestData(params) {
  return {
    type: GET_DEPOSIT_IMPREST_DATA,
    payload: {
      ...params
    }
  }
}


export const actions = {
  getDepositImprestData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DEPOSIT_IMPREST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    depositImprestData: action.dataResponse,
    currentPage: action.currentPageResponse,
    totalCount: action.totalCountResponse
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  depositImprestData: [],
  currentPage: 1,
  totalCount: 0
};

export default function depositImprestReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
