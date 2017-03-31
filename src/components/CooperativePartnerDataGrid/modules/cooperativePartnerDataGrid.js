/**
 * Created by NXQ on 11/15/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_COOPERATIVE_PARTNER_DATA = 'GET_COOPERATIVE_PARTNER_DATA';
export const GET_COOPERATIVE_PARTNER_DATA_SUCCESS = 'GET_COOPERATIVE_PARTNER_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getCooperativePartnerData(id) {
  return {
    type: GET_COOPERATIVE_PARTNER_DATA,
    payload: {
      id                                   // 当前组织结构ID
    }
  }
}


export const actions = {
  getCooperativePartnerData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_COOPERATIVE_PARTNER_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    signContractData: action.signPartnerResponse,
    noSignContractData: action.noSignPartnerResponse,
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  signContractData: [],           // 已签约的合同数组
  noSignContractData: []          // 未签约的合同数组
};
export default function cooperativePartnerDataReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
