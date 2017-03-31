/**
 * Created by NXQ on 11/4/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_TEMP_CREDIT_QUERY_DATA = 'GET_TEMP_CREDIT_QUERY_DATA';
export const GET_TEMP_CREDIT_QUERY_DATA_SUCCESS = 'GET_TEMP_CREDIT_QUERY_DATA_SUCCESS';
export const DELETE_SING_TEMP_CREDIT_QUERY_DATA = 'DELETE_SING_TEMP_CREDIT_QUERY_DATA';
export const DELETE_SING_TEMP_CREDIT_QUERY_DATA_SUCCESS = 'DELETE_SING_TEMP_CREDIT_QUERY_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getTempCreditQueryData({ AuthorizeOrganizationId, AuthorizedOrganizationId }) {
  return {
    type: GET_TEMP_CREDIT_QUERY_DATA,
    payload: {
      AuthorizeOrganizationId,         // 授权经销商id
      AuthorizedOrganizationId        // 被授权经销商id
    }
  }
}

export function deleteSingleTempCreditData(deleteObject) {
  return {
    type: DELETE_SING_TEMP_CREDIT_QUERY_DATA,
    payload: deleteObject // 要删除的临时信用对象
  }
}


export const actions = {
  getTempCreditQueryData,
  deleteSingleTempCreditData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_TEMP_CREDIT_QUERY_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    tempCreditQueryData: action.tempCreditResponse
  }),
  [DELETE_SING_TEMP_CREDIT_QUERY_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    deleteObject: action.deleteObject
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  tempCreditQueryData: [],
  deleteObject: {}
};
export default function tempCreditQueryReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
