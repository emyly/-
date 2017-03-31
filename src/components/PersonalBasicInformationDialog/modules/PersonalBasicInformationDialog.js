/**
 * Created by liuyali on 2016/11/4.
 */
export const GET_PSNLBASICINFO_DATA = 'GET_PSNLBASICINFO_DATA';
export const GET_PSNLBASICINFO_DATA_SUCCESS = 'GET_PSNLBASICINFO_DATA_SUCCESS';
export const GET_PSNLBASICINFO_DATA_ERROR = 'GET_PSNLBASICINFO_DATA_ERROR';
export const PUT_PSNLBASICINFO_DATA = 'PUT_PSNLBASICINFO_DATA';
export const PUT_PSNLBASICINFO_DATA_SUCCESS = 'PUT_PSNLBASICINFO_DATA_SUCCESS';
export const PUT_PSNLBASICINFO_DATA_ERROR = 'PUT_PSNLBASICINFO_DATA_ERROR';
export const EXIT_DATA = 'EXIT_DATA';
export const EXIT_DATA_SUCCESS = 'EXIT_DATA_SUCCESS';
export const EXIT_DATA_ERROR = 'EXIT_DATA_ERROR';

export function getPersonalBasicInfoData(id) {
  return {
    type: GET_PSNLBASICINFO_DATA,
    payload: {
      id
    }
  }
}

export function putPersonalBasicInfoData(flag, id, newInfo, imgData, userData) {
  return {
    type: PUT_PSNLBASICINFO_DATA,
    payload: {
      id,
      imgChange: flag,
      imgData: imgData || {},
      info: newInfo,
      userData,
    }
  }
}

export function exitDispatch() {
  return {
    type: EXIT_DATA
  }
}

/*
* status : 0 展示状态进入  ， 1 编辑状态进入
* */
const ACTION_HANDLERS = {
  [GET_PSNLBASICINFO_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: '0',
    userdata: action.response,
  }),
  [GET_PSNLBASICINFO_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.error
  }),
  [PUT_PSNLBASICINFO_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: '1',
    userdata: action.response
  }),
  [PUT_PSNLBASICINFO_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: '2',
    error: action.error
  }),
  [EXIT_DATA_SUCCESS]: (state) => Object.assign({}, state, {
    loginOut: true
  }),
  [EXIT_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: 'error',
    error: action.error
  }),
}

const initialState = {
  userdata: [],
  status: false,
}
export default function getPersonalBasicInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

