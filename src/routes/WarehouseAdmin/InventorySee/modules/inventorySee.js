/**
 * Created by liuyali on 2016/12/2.
 */
/**
 * Created by liuyali on 2016/11/9.
 */
/* 开始盘存*/
export const GET_INVENTORY_SEE_DATA = 'GET_INVENTORY_SEE_DATA';
export const GET_INVENTORY_SEE_DATA_SUCCESS = 'GET_INVENTORY_SEE_DATA_SUCCESS';
export const GET_INVENTORY_SEE_DATA_ERROR = 'GET_INVENTORY_SEE_DATA_ERROR';


export function inventorySee(page = 1, params) {
  return {
    type: GET_INVENTORY_SEE_DATA,
    page,
    params
  }
}

const ACTION_HANDLERS = {
  [GET_INVENTORY_SEE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.resultArr,
    currentPage: action.cPage,
    total: action.total
  }),
  [GET_INVENTORY_SEE_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: 'error',
    error: action.error
  }),
};


const initialState = {
  status: false,
  data: []
}

export default function inventorySeeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
