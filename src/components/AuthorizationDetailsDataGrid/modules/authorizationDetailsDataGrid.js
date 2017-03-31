/**
 * Created by NXQ on 11/18/2016.
 */

/**
 * Created by NXQ on 11/15/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA = 'GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA';
export const GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA_SUCCESS = 'GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA_SUCCESS';
export const GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA__FAIL = 'GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA__FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function getCurrentContractAuthorizedData(id) {
  return {
    type: GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA,
    payload: {
      id                                   // 当前合同ID
    }
  }
}


export const actions = {
  getCurrentContractAuthorizedData         // 当前合同下已授权清单
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    currentContractAuthorizedData: action.currentContractAuthorizedResponse,
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentContractAuthorizedData: [],           // 当前合同下已授权清单数据
};
export default function authorizationDetailsDataGridReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
