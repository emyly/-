/**
 * Created by NXQ on 11/4/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const HANDLE_TOGGLE_MENUBAR_DRAWER = 'HANDLE_TOGGLE_MENUBAR_DRAWER';

/*动态获取菜单栏*/

/*获取菜单正颗树*/
export const GET_ALL_MENUBAR_TREE = 'GET_ALL_MENUBAR_TREE';
export const GET_ALL_MENUBAR_TREE_SUCCESS = 'GET_ALL_MENUBAR_TREE_SUCCESS';
export const GET_ALL_MENUBAR_TREE_ERROR = 'GET_ALL_MENUBAR_TREE_ERROR';

/*获取用户有权限的部分树*/
export const GET_USER_MENUBAR_TREE = 'GET_USER_MENUBAR_TREE';
export const GET_USER_MENUBAR_TREE_SUCCESS = 'GET_USER_MENUBAR_TREE_SUCCESS';
export const GET_USER_MENUBAR_TREE_ERROR = 'GET_USER_MENUBAR_TREE_ERROR';
// ------------------------------------
// Actions
// ------------------------------------
export function handleToggleDrawer(openStatus) {
  return {
    type: HANDLE_TOGGLE_MENUBAR_DRAWER,
    payload: {
      open: openStatus
    }
  }
}
export function getAllMenuBar() {
  return {
    type: GET_ALL_MENUBAR_TREE
  }
}
export function getUserMenuBar(yhid) {
  return {
    type: GET_USER_MENUBAR_TREE,
    yhid
  }
}
export const actions = {
  handleToggleDrawer
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HANDLE_TOGGLE_MENUBAR_DRAWER]: (state, action) => Object.assign({}, state, {
    open: action.payload.open
  }),
  [GET_ALL_MENUBAR_TREE_SUCCESS]: (state, action) => Object.assign({}, state, {
    getAllTreeStatus:true,
    allTreeArr:action.response
  }),
  [GET_USER_MENUBAR_TREE_SUCCESS]: (state, action) => Object.assign({}, state, {
    getUserTreeStatus:true,
    userTreeArr:action.response
  }),
  [GET_ALL_MENUBAR_TREE_ERROR]: (state, action) => Object.assign({}, state, {
    getAllTreeStatus:false,error:action.error
  }),
  [GET_USER_MENUBAR_TREE_ERROR]: (state, action) => Object.assign({}, state, {
    getUserTreeStatus:false,error:action.error
  }),

};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  open: true,
  getAllTreeStatus:false,
  getUserTreeStatus:false
};
export default function menuBarReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
