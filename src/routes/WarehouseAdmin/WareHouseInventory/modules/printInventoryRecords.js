/**
 * Created by liuyali on 2016/11/9.
 */

export const PRINT_INVENTORYRECORDS = 'PRINT_INVENTORYRECORDS';
export const PRINT_INVENTORYRECORDS_SUCCESS = 'PRINT_INVENTORYRECORDS_SUCCESS';
export const PRINT_INVENTORYRECORDS_ERROR = 'PRINT_INVENTORYRECORDS_ERROR';


export function printInventoryRecords(id) {
  return {
    type: PRINT_INVENTORYRECORDS,
    payload: {
      id
    }
  }
}

const ACTION_HANDLERS = {
  [PRINT_INVENTORYRECORDS_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.response
  }),
  [PRINT_INVENTORYRECORDS_ERROR]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.error
  }),
};

const initialState = {
  status: false,
  data: []
}

export default function printInventoryRecordsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
