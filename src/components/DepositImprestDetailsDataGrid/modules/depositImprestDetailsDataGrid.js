/**
 * Created by NXQ on 1/5/2017.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DEPOSIT_IMPREST_DETAILS_DATA = 'GET_DEPOSIT_IMPREST_DETAILS_DATA';
export const GET_DEPOSIT_IMPREST_DETAILS_DATA_SUCCESS = 'GET_DEPOSIT_IMPREST_DETAILS_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getDepositImprestDetailsData(params) {
  return {
    type: GET_DEPOSIT_IMPREST_DETAILS_DATA,
    payload: {
      ...params
    }
  }
}


export const actions = {
  getDepositImprestDetailsData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DEPOSIT_IMPREST_DETAILS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    depositImprestDetailsData: action.dataResponse,
    currentPage: action.currentPageResponse,
    totalCount: action.totalCountResponse
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  depositImprestDetailsData: [],
  currentPage: 1,
  totalCount: 0
};

export default function depositImprestDetailsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
