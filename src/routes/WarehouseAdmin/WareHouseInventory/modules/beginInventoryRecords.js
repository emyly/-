/**
 * Created by liuyali on 2016/11/9.
 */
/* 开始盘存*/
export const BENGIN_INVENTORYRECORDS = 'GET_BENGININVENTORYRECORDS_DATA';
export const BENGIN_INVENTORYRECORDS_SUCCESS = 'GET_BENGININVENTORYRECORDS_DATA_SUCCESS';
export const BENGIN_INVENTORYRECORDS_ERROR = 'GET_BENGININVENTORYRECORDS_DATA_ERROR';

/* 查看盘存仓库状态*/
export const CHEK_INVENTORY_STATUS = 'CHEK_INVENTORY_STATUS';
export const CHEK_INVENTORY_STATUS_SUCCESS = 'CHEK_INVENTORY_STATUS_SUCCESS';
export const CHEK_INVENTORY_STATUS_ERROR = 'CHEK_INVENTORY_STATUS_ERROR';

/*
* 初始化开始盘存状态
* */
export const SET_BEGIN_INVENTORY_INIT = 'SET_BEGIN_INVENTORY_INIT';

export function beginInventoryRecords(params) {
  return {
    type: BENGIN_INVENTORYRECORDS,
    payload: {
      ...params
    }
  }
}

export function checkInventoryStatus(id) {
  return {
    type: CHEK_INVENTORY_STATUS,
    id
  }
}

export function setBeginInventoryInit() {
  return {
    type: SET_BEGIN_INVENTORY_INIT,
  }
}

const ACTION_HANDLERS = {
  [SET_BEGIN_INVENTORY_INIT]: state => ({
    status: false,
    checkInstatus: true
  }),
  [BENGIN_INVENTORYRECORDS_SUCCESS]: state => Object.assign({}, state, {
    status: true,
  }),
  [BENGIN_INVENTORYRECORDS_ERROR]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.error
  }),
  [CHEK_INVENTORY_STATUS_SUCCESS]: state => Object.assign({}, state, {
    checkInstatus: true,
  }),
  [CHEK_INVENTORY_STATUS_ERROR]: (state, action) => Object.assign({}, state, {
    checkInstatus: false,
    checkInerror: action.error
  }),
};


const initialState = {
  status: false,
  checkInstatus: true
}

export default function beginInventoryRecordsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
