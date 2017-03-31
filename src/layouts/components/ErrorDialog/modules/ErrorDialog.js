// ------------------------------------
// Constants
// ------------------------------------
export const ERROR = 'ERROR';
export const PUT_CHANGE_ERROR_STATUS_SUCCESS = 'PUT_CHANGE_ERROR_STATUS_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function putChangeErrorStatus() {
  return (dispatch) => {
    dispatch({
      type: PUT_CHANGE_ERROR_STATUS_SUCCESS
    });
  };
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ERROR]: (state, action) =>
    // console.error('error:', JSON.stringify(action.error.response.message));    // 测试使用,后期删除
     Object.assign({}, state, {
       status: false,
       error: action.error.response,
       errorOpenDialogStatus: true
     }),
  [PUT_CHANGE_ERROR_STATUS_SUCCESS]: state => Object.assign({}, state, {
    errorOpenDialogStatus: false
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  status: true,
  errorOpenDialogStatus: false
};

export default function errorDialogReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
