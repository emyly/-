/**
 * Created by liuyali on 2016/11/9.
 */
/* 结束盘存*/
export const END_INVENTORYRECORDS = 'END_INVENTORYRECORDS';
export const END_INVENTORYRECORDS_SUCCESS = 'END_INVENTORYRECORDS_SUCCESS';
export const END_INVENTORYRECORDS_ERROR = 'END_INVENTORYRECORDS_ERROR';

export function endInventoryRecords(id, currentPage) {
  return {
    type: END_INVENTORYRECORDS,
    payload: {
      id,
      currentPage
    }
  }
}


const ACTION_HANDLERS = {
  [END_INVENTORYRECORDS_SUCCESS]: state => Object.assign({}, state, {
    status: true,
  }),
  [END_INVENTORYRECORDS_ERROR]: (state, action) => Object.assign({}, state, {
    status: 'error',
    error: action.error
  }),
};

const initialState = {
  status: false
}

export default function endInventoryRecordsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
