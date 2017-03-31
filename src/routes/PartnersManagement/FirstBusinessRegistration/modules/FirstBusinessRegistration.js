/**
 * Created by liuyali on 2016/11/22.
 */

export const FIRST_CHECKIN_CREATE_ORG = 'FIRST_CHECKIN_CREATE_ORG';
export const FIRST_CHECKIN_CREATE_ORG_SUCCESS = 'FIRST_CHECKIN_CREATE_ORG_SUCCESS';
export const FIRST_CHECKIN_CREATE_ORG_ERROR = 'FIRST_CHECKIN_CREATE_ORG_ERROR';


export function createOrg(params) {
  return {
    type: FIRST_CHECKIN_CREATE_ORG,
    ...params
  }
}


const ACTION_HANDLERS = {
  [FIRST_CHECKIN_CREATE_ORG_SUCCESS]: (state) => Object.assign({}, state, {
    status: true,
  }),
  [FIRST_CHECKIN_CREATE_ORG_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: false,
    error: action.error
  }),
};

const initialState = {
  status: false,
}

export default function FirstBusinessRegistrationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
