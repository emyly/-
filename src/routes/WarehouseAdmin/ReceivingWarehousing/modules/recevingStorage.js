
/**
 * Created by qyf on 2016/11/10.
 */
/* constants*/

export const GET_RECEVING_Storage_DATA = 'GET_RECEVING_Storage_DATA';
export const GET_RECEVING_Storage_DATA_SUCESS = 'GET_RECEVING_Storage_DATA_SUCESS';
export const GET_RECEVING_Storage_DATA_FAIL = 'GET_RECEVING_Storage_DATA_FAIL'


// Actions
export function getStorageData(id, type) {
  return {
    type: GET_RECEVING_Storage_DATA,
    payload: {
      type,
      id   // 订单id
    }
  }
}
export const actions = {
  getStorageData
}
const ACTTON_HANDLERS = {
  [GET_RECEVING_Storage_DATA_SUCESS]: (state, actions) => Object.assign({}, state, {
    StorageData: actions.response
  }),
  [GET_RECEVING_Storage_DATA_FAIL]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error
  })
}
// reducer
const initialState = {
  StorageData: {}   // 收货入库的详情

}
export default function StorageReducer(state = initialState, action) {
  const handler = ACTTON_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
