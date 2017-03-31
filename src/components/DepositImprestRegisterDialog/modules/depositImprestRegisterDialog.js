/**
 * Created by NXQ on 17/1/7.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DEPOSIT_IMPREST_REGISTER_PARTNER_DATA = 'GET_DEPOSIT_IMPREST_REGISTER_PARTNER_DATA';
export const GET_DEPOSIT_IMPREST_REGISTER_PARTNER_DATA_SUCCESS = 'GET_DEPOSIT_IMPREST_REGISTER_PARTNER_DATA_SUCCESS';
export const POST_DEPOSIT_IMPREST_REGISTER_DATA = 'POST_DEPOSIT_IMPREST_REGISTER_DATA';
export const POST_DEPOSIT_IMPREST_REGISTER_DATA_SUCCESS = 'POST_DEPOSIT_IMPREST_REGISTER_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getDepositImprestPartnerData(authorize_organization_id) {
  return {
    type: GET_DEPOSIT_IMPREST_REGISTER_PARTNER_DATA,
    payload: {
      authorize_organization_id
    }
  }
}

export function postDepositImprestData(obj) {
  return {
    type: POST_DEPOSIT_IMPREST_REGISTER_DATA,
    payload: {
      ...obj
    }
  }
}


export const actions = {
  getDepositImprestPartnerData,
  postDepositImprestData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DEPOSIT_IMPREST_REGISTER_PARTNER_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    partnerData: action.dataResponse
  }),
  [POST_DEPOSIT_IMPREST_REGISTER_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    createStatus: '1'
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  partnerData: [],
  createStatus: '0'   // '0'初始化状态 '1'创建成功状态 '2'创建失败状态
};

export default function depositImprestPartnerReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
