// ------------------------------------
// Constants
// ------------------------------------
export const USER_LOGIN = 'login_USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'login_USER_LOGIN_SUCCESS'
export const USER_LOGIN_ERROR = 'login_USER_LOGIN_ERROR'
export const INIT_STORE = 'login_INIT_STORE'
export const SEND_MESS = 'login_SEND_MESS'
export const SEND_MESS_SUCCESS = 'login_SEND_MESS_SUCCESS'
export const SEND_MESS_ERROR = 'login_SEND_MESS_ERROR'
export const RESET_PW = 'login_RESET_PW'
export const RESET_PW_SUCCESS = 'login_RESET_PW_SUCCESS'
export const RESET_PW_ERROR = 'login_RESET_PW_ERROR'
// ------------------------------------
// Actions
// ------------------------------------
export function userLogin(SJHM, MM) {
  return {
    type: USER_LOGIN,
    payload: { SJHM, MM }
  }
}

export function initStore() {
  return {
    type: INIT_STORE
  }
}

export function sendMess(JSSJH) {
  return {
    type: SEND_MESS,
    payload: { FSR: '', JSSJH }
  }
}

export function resetPW(SJHM, MM, YZM) {
  return {
    type: RESET_PW,
    payload: { SJHM, MM, YZM }
  }
}

export const actions = {
  userLogin,
  initStore,
  sendMess,
  resetPW
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_LOGIN]: (state, action) => state,
  [USER_LOGIN_SUCCESS]: (state, action) => Object.assign({}, state, {
    result: action.response
  }),
  [USER_LOGIN_ERROR]: (state, action) => Object.assign({}, state, {
    message: action.response
  }),
  [SEND_MESS]: (state, action) => state,
  [SEND_MESS_SUCCESS]: (state, action) => Object.assign({}, state, {
    sendResult: action.response
  }),
  [SEND_MESS_ERROR]: (state, action) => Object.assign({}, state, {
    message: action.response
  }),
  [RESET_PW]: (state, action) => state,
  [RESET_PW_SUCCESS]: (state, action) => Object.assign({}, state, {
    resetPWResult: action.response
  }),
  [RESET_PW_ERROR]: (state, action) => Object.assign({}, state, {
    message: action.response
  }),
  [INIT_STORE]: (state, action) => Object.assign({}, state, initialState)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  result: false,
  message: '',
  sendResult: false,
  resetPWResult: false
}

export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
