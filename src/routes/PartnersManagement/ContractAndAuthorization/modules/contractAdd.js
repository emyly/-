/**
 * Created by NXQ on 11/16/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const POST_SINGLE_NEW_CONTRACT_DATA = 'POST_SINGLE_NEW_CONTRACT_DATA';
export const POST_SINGLE_NEW_CONTRACT_DATA_SUCCESS = 'POST_SINGLE_NEW_CONTRACT_DATA_SUCCESS';
export const POST_SINGLE_NEW_CONTRACT_DATA_FAIL = 'POST_SINGLE_NEW_CONTRACT_DATA_FAIL';
export const DISPATCH_CONTRACT_CREATE_STATUS = 'DISPATCH_CONTRACT_CREATE_STATUS';

// ------------------------------------
// Actions
// ------------------------------------
export function postSingleNewContractData(createObj) {
  return {
    type: POST_SINGLE_NEW_CONTRACT_DATA,
    payload: createObj
  }
}

export function putChangeCreateStatus() {
  return (dispatch) => {
    dispatch({
      type: DISPATCH_CONTRACT_CREATE_STATUS
    });
  };
}

export const actions = {
  postSingleNewContractData,            // 创建新合同
  putChangeCreateStatus                 // 直接dispatch改变createStatus
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POST_SINGLE_NEW_CONTRACT_DATA_SUCCESS]: state => Object.assign({}, state, {
    createStatus: '1'
  }),
  [POST_SINGLE_NEW_CONTRACT_DATA_FAIL]: state => Object.assign({}, state, {
    createStatus: '2'
  }),
  [DISPATCH_CONTRACT_CREATE_STATUS]: state => Object.assign({}, state, {
    createStatus: '0'
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  createStatus: '0'       // 创建是否成功状态 '0'初始化状态 '1'创建成功 '2'创建失败
};
export default function contractAddReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
