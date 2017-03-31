// ------------------------------------
// Constants
// ------------------------------------
export const GET_PARTNER_DATA = 'GET_PARTNER_DATA';
export const GET_PARTNER_DATA_SUCCESS = 'GET_PARTNER_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getPartnerData(id, type) {
  return {
    type: GET_PARTNER_DATA,
    payload: {
      id,
      type
    }
  }
}

export const actions = {
  getPartnerData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PARTNER_DATA]: (state, action) => state,
  [GET_PARTNER_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    partnerData: action.response
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  partnerData: [],

};

export default function partnerSelectReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
