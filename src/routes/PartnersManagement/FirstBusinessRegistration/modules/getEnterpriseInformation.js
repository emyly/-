/**
 * Created by SJF on 2017/1/22.
 */

export const GET_ENTERPRISE_INFORMATION = 'GET_ENTERPRISE_INFORMATION';
export const GET_ENTERPRISE_INFORMATION_SUCCESS = 'GET_ENTERPRISE_INFORMATION_SUCCESS';
export const GET_ENTERPRISE_INFORMATION_ERROR = 'GET_ENTERPRISE_INFORMATION_ERROR';


export function getEnterpriseInformation(orgId) {
  return {
    type: GET_ENTERPRISE_INFORMATION,
    orgId
  }
}


const ACTION_HANDLERS = {
  [GET_ENTERPRISE_INFORMATION_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    InformationData: action.data
  }),
  [GET_ENTERPRISE_INFORMATION_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: false,
    error: action.error
  }),
};

const initialState = {
  status: false,
  InformationData: {}
};

export default function getEnterpriseInformationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
