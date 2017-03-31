/**
 * Created by NXQ on 11/8/2016.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_CREDIT_ORGANIZATION_TO_ME_LIST_DATA = 'GET_CREDIT_ORGANIZATION_TO_ME_LIST_DATA';
export const GET_CREDIT_ORGANIZATION_TO_ME_LIST_DATA_SUCCESS = 'GET_CREDIT_ORGANIZATION_TO_ME_LIST_DATA_SUCCESS';
export const GET_CREDIT_GAIN_QUERY_DATA = 'GET_CREDIT_GAIN_QUERY_DATA';
export const GET_CREDIT_GAIN_QUERY_DATA_SUCCESS = 'GET_CREDIT_GAIN_QUERY_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getCreditOrganizationToMeListData(id) {
  return {
    type: GET_CREDIT_ORGANIZATION_TO_ME_LIST_DATA,
    payload: {
      id                                    // 当前组织机构id
    }
  }
}

export function getCreditQueryData({ AuthorizeOrganizationName, AuthorizeOrganizationId, AuthorizedOrganizationId }) {
  return {
    type: GET_CREDIT_GAIN_QUERY_DATA,
    payload: {
      AuthorizeOrganizationName,      // 授权经销商名称
      AuthorizeOrganizationId,         // 授权经销商id
      AuthorizedOrganizationId        // 被授权经销商id
    }
  }
}


export const actions = {
  getCreditOrganizationToMeListData            // 获取授信于我的公司列表actions
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CREDIT_ORGANIZATION_TO_ME_LIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    gainCreditData: action.response
  }),
  [GET_CREDIT_GAIN_QUERY_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    creditDetailData: action.creditResponse,
    firstStatus: true,
    validDate: action.validDateResponse,
    gainCreditDate: state.gainCreditData
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  CreditToMeOrganizationData: [],    // 授权于我的公司列表
  firstStatus: false,               // 记录判断第一次进来是否请求过经销商信用
  creditDetailData: {},              // 经销商信用总表详情
  validDate: {},                     // 经销商信用有效期
  gainCreditData: []                 // 获得的信用列表
};
export default function creditGainTempReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
