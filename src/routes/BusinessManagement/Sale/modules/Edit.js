/**
 * Created by sjf on 2016/11/18.
 */
export const EDIT_SALE_LIST = 'EDIT_SALE_LIST';
export const EDIT_SALE_LIST_SUCCESS = 'EDIT_SALE_LIST_SUCCESS';
export const EDIT_SALE_LIST_FAIL = 'EDIT_SALE_LIST_FAIL';
export const EDIT_SALE_LIST_IS_FETCHING = 'EDIT_SALE_LIST_IS_FETCHING';

// ------------------------------------
// Action
// ------------------------------------
export function EditList(orgId, id, type) {
  return {
    type: EDIT_SALE_LIST,
    payload: {
      orgId,
      id,
      type
    }

  }
}
export function EditListSuccess(editListData) {
  return {
    type: EDIT_SALE_LIST_SUCCESS,
    editListData
  }
}

export function EditListFail(error) {
  return {
    type: EDIT_SALE_LIST_FAIL,
    error
  }
}

export function EditListChangeIsFetching() {
  return {
    type: EDIT_SALE_LIST_IS_FETCHING
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_SALE_LIST]: (state, action) => ({
    ...state,
    isSave: false,
    orgId: action.orgId
  }),

  [EDIT_SALE_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isSave: true,
    editListData: action.editListData,
  }),

  [EDIT_SALE_LIST_FAIL]: (state, action) => ({
    ...state,
    isSave: false,
    error: action.error
  }),
  [EDIT_SALE_LIST_IS_FETCHING]: (state, action) => ({
    ...state,
    isSave: false
  })

};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isSave: false,
  editListData: []
};

export default function EditListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
