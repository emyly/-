// ------------------------------------
// Constants
// ------------------------------------
export const GLOBAL_LOADING = 'GLOBAL_LOADING';
export const INIT_GLOBAL_LOADING = 'INIT_GLOBAL_LOADING';

// ------------------------------------
// Actions
// ------------------------------------
export function initGlobalLoading() {
  return {
    type: INIT_GLOBAL_LOADING
  }
}


export const actions = {
  initGlobalLoading
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_GLOBAL_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      isLoading: '0'
    })
  },
  [GLOBAL_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      status: false,
      isLoading: action.response
    })
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: '0'              // '0'表示初始化状态, '1'表示加载中, '2'表示加载成功, '3'表示加载失败
};

export default function loadingDialogReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
