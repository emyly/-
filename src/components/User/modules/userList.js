// ------------------------------------
// Constants
// ------------------------------------
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function changeUser(userInfo) {
  return {
    type: GET_TOKEN_SUCCESS,
    response: userInfo
  }
}

export const actions = {
  changeUser
}
