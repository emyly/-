/**
 * Created by NXQ on 12/14/2016.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_PUSH_SERVICE_SETTINGS_DATA = 'GET_PUSH_SERVICE_SETTINGS_DATA';
export const GET_PUSH_SERVICE_SETTINGS_DATA_SUCCESS = 'GET_PUSH_SERVICE_SETTINGS_DATA_SUCCESS';
export const GET_PUSH_SERVICE_SETTINGS_DATA_SUCCESS_FAIL = 'GET_PUSH_SERVICE_SETTINGS_DATA_SUCCESS_FAIL';
export const UPDATE_PUSH_SERVICE_SETTINGS_DATA = 'UPDATE_PUSH_SERVICE_SETTINGS_DATA';
export const UPDATE_PUSH_SERVICE_SETTINGS_DATA_SUCCESS = 'UPDATE_PUSH_SERVICE_SETTINGS_DATA_SUCCESS';
export const UPDATE_PUSH_SERVICE_SETTINGS_DATA_FAIL = 'UPDATE_PUSH_SERVICE_SETTINGS_DATA_FAIL';
export const INIT_UPDATE_PUSH_SERVICE_SETTING_DATA_STATUS = 'INIT_UPDATE_PUSH_SERVICE_SETTING_DATA_STATUS';

// ------------------------------------
// Actions
// ------------------------------------
export function initPushServiceSettingsData() {
  return {
    type: INIT_UPDATE_PUSH_SERVICE_SETTING_DATA_STATUS
  }
}

export function getPushServiceSettingsData() {
  return {
    type: GET_PUSH_SERVICE_SETTINGS_DATA,
    payload: {
    }
  }
}

export function updatePushServiceSettingsData(id, intervalTime) {
  return {
    type: UPDATE_PUSH_SERVICE_SETTINGS_DATA,
    payload: {
      id,
      XXPZB: {
        SJXXSJJG: intervalTime // 毫秒为单位
      }
    }
  }
}

export const actions = {
  initPushServiceSettingsData,
  getPushServiceSettingsData,
  updatePushServiceSettingsData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_UPDATE_PUSH_SERVICE_SETTING_DATA_STATUS]: (state, action) => Object.assign({}, state, {
    updateSetUpStatus: '0',
    getDataStatus: '0'
  }),
  [GET_PUSH_SERVICE_SETTINGS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    pushServiceSettingsData: action.dataResponse,
    getDataStatus: '1'
  }),
  [GET_PUSH_SERVICE_SETTINGS_DATA_SUCCESS_FAIL]: (state, action) => Object.assign({}, state, {
    getDataStatus: '2'
  }),
  [UPDATE_PUSH_SERVICE_SETTINGS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    updateSetUpStatus: '1'
  }),
  [UPDATE_PUSH_SERVICE_SETTINGS_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    updateSetUpStatus: '2'
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  pushServiceSettingsData: {},                // 推送服务设置数据
  getDataStatus: '0',                         // 获取推送服务设置数据状态 '0'初始化状态 '1'获取数据成功 '2'获取数据失败
  updateSetUpStatus: '0'                      // 更新推送服务设置状态 '0'初始化状态 '1'更新成功 '2' 更新失败
};
export default function pushServiceSettingsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
