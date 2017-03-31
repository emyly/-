/**
 * Created by NXQ on 11/18/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA = 'GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA';
export const GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA_SUCCESS = 'GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA_SUCCESS';
export const GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA__FAIL = 'GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA__FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function getAllContractAuthorizedData(id) {    // 等RA接口增加更新后不需要传任何参数
  return {
    type: GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA,
    payload: {
      id
    }
  }
}


export const actions = {
  getAllContractAuthorizedData         // 获取当前组织机构下所有已获得的授权清单
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    allContractAuthorizedData: action.allContractAuthorizedResponse,
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  allContractAuthorizedData: [],           // 所有合同下已授权清单数据
};
export default function authorizationAllContractDetailsDataGridReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
