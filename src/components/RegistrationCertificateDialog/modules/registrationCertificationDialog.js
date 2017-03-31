
export const GET_REGISTRATIONCERTIFICATE_DATA = 'GET_REGISTRATIONCERTIFICATE_DATA';
export const GET_REGISTRATIONCERTIFICATE_DATA_SUCCESS = 'GET_REGISTRATIONCERTIFICATE_DATA_SUCCESS';
export const GET_REGISTRATIONCERTIFICATE_DATA_FAIL = 'GET_REGISTRATIONCERTIFICATE_DATA_FAIL'

export const INIT_REGISTRATIONCA_DATA = 'INIT_REGISTRATIONCA_DATA';
// Actions
export function getRegistrationCertificateInfoDate(params) {
  return {
    type: GET_REGISTRATIONCERTIFICATE_DATA,
    payload: {
      params
    }
  }
}
export function initRegistrationCAData() {
  return {
    type: INIT_REGISTRATIONCA_DATA
  }
}
export const actions = {
  getRegistrationCertificateInfoDate
};
const ACTION_HANDLERS = {
  [GET_REGISTRATIONCERTIFICATE_DATA]: (state, action) => state,
  [GET_REGISTRATIONCERTIFICATE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    registrationCertificateData: action.response,
  }),
  [GET_REGISTRATIONCERTIFICATE_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
  [GET_REGISTRATIONCERTIFICATE_DATA]: (state, action) => Object.assign({}, state, {
    registrationCertificateData: {},
    error: null
  }),
};
// Reducer
const initState = {
  registrationCertificateData: {},
  error: null
};
export default function logRecordReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
