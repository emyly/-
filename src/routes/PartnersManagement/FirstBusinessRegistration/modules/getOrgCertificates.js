/**
 * Created by liuyali on 2016/11/23.
 */
/**
 * Created by liuyali on 2016/11/22.
 */
export const GET_ORG_CERTIFICATES = 'GET_ORG_CERTIFICATES';
export const GET_ORG_CERTIFICATES_SUCCESS = 'GET_ORG_CERTIFICATES_SUCCESS';
export const GET_ORG_CERTIFICATES_ERROR = 'GET_ORG_CERTIFICATES_ERROR';

export function getOrgCertificate(id) {
  return {
    type: GET_ORG_CERTIFICATES,
    id
  }
}
const ACTION_HANDLERS = {
  [GET_ORG_CERTIFICATES_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.data,
  }),
  [GET_ORG_CERTIFICATES_ERROR]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.error
  }),
};

const initialState = {
  status: false,
  data: []
}

export default function getOrgCertificateReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
