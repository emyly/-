/**
 * Created by sjf on 2016/11/16.
 */
export const AGENCY_SALE_LIST = 'AGENCY_SALE_LIST';
export const AGENCY_SALE_LIST_SUCCESS = 'AGENCY_SALE_LIST_SUCCESS';
export const AGENCY_SALE_LIST_FAIL = 'AGENCY_SALE_LIST_FAIL';
// ------------------------------------
// Action
// ------------------------------------
export function AgencyList(id) {
  return {
    type: AGENCY_SALE_LIST,
    payload: {
      id
    }

  }
}
export function AgencyListSuccess(agencyList) {
  return {
    type: AGENCY_SALE_LIST_SUCCESS,
    agencyList
  }
}

export function AgencyListFail(error) {
  return {
    type: AGENCY_SALE_LIST_FAIL,
    error
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [AGENCY_SALE_LIST]: (state, action) => ({
    ...state,
    isFetching: true,
    orgId: action.orgId
  }),

  [AGENCY_SALE_LIST_SUCCESS]: (state, action) => {
    action.agencyList.map((value, index) => {
      value.checked = false
    });
    return {
      ...state,
      isFetching: false,
      agencyList: action.agencyList,

    }
  },

  [AGENCY_SALE_LIST_FAIL]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.error
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  agencyList: []
};

export default function anencyListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
