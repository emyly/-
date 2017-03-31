/**
 * Created by liuyali on 2016/11/9.
 */

/* 获取盘存记录*/
export const GET_INVENTORYRECORDS_DATA = 'GET_INVENTORYRECORDS_DATA';
export const GET_INVENTORYRECORDS_DATA_SUCCESS = 'GET_INVENTORYRECORDS_DATA_SUCCESS';
export const GET_INVENTORYRECORDS_DATA_ERROR = 'GET_INVENTORYRECORDS_DATA_ERROR';

export function getInventoryRecordsData(page = 1) {
  return {
    type: GET_INVENTORYRECORDS_DATA,
    payload: {
      page
    }
  }
}

const ACTION_HANDLERS = {
  [GET_INVENTORYRECORDS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.payload.resultArr,
    currentPage: action.payload.cPage || 1,
    total: action.payload.total
  }),
  [GET_INVENTORYRECORDS_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.error
  }),
};

const initialState = {
  status: false,
}


export default function getInventoryRecordsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
