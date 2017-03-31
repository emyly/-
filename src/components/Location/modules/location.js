/**
 * Created by liuyali on 2016/12/2.
 */
export const GET_LOCATION_DATA_PROVINCE = 'GET_LOCATION_DATA_PROVINCE'
export const GET_LOCATION_DATA_PROVINCE_SUCCESS = 'GET_LOCATION_DATA_PROVINCE_SUCCESS'
export const GET_LOCATION_DATA_PROVINCE_ERROR = 'GET_LOCATION_DATA_PROVINCE_ERROR'

export const GET_AREA_OR_CITY_DATA = 'GET_AREA_OR_CITY_DATA'
export const GET_AREA_OR_CITY_DATA_SUCCESS = 'GET_AREA_OR_CITY_DATA_SUCCESS'
export const GET_AREA_OR_CITY_DATA_ERROR = 'GET_AREA_OR_CITY_DATA_ERROR'

export const INIT_LOCATION_DATA = 'INIT_LOCATION_DATA'
export const INIT_ALLLOCATION_DATA = 'INIT_ALLLOCATION_DATA'

export const GET_ALLLOCATION_DATA = 'GET_ALLLOCATION_DATA'
export const GET_ALLLOCATION_DATA_SUCCESS = 'GET_ALLLOCATION_DATA_SUCCESS'
export const GET_ALLLOCATION_DATA_ERROR = 'GET_ALLLOCATION_DATA_ERROR'
// 获取所有行政区划地址
export function getAllLocationData(params) {
  return {
    type: GET_ALLLOCATION_DATA,
    params
  }
}
// Actions
export function getLocationData() {
  return {
    type: GET_LOCATION_DATA_PROVINCE
  }
}
export function initAllLocationData() {
  return {
    type: INIT_ALLLOCATION_DATA
  }
}
export function getCityOrAreaData(id, LX) {
  return {
    type: GET_AREA_OR_CITY_DATA,
    id,
    LX
  }
}

export function initLocationData() {
  return {
    type: INIT_LOCATION_DATA,
  }
}

const ACTION_HANDLERS = {
  [GET_ALLLOCATION_DATA]: (state, action) => state,
  [GET_ALLLOCATION_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    allLocationDara: action.response,
    allAreaArr: action.allAreaArr
  }),
  [GET_ALLLOCATION_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
  [GET_LOCATION_DATA_PROVINCE_SUCCESS]: (state, action) => ({
    ...state,
    provinceData: action.resultArr,
    cityData: [],
    areaData: [],
  }),
  [GET_AREA_OR_CITY_DATA_SUCCESS]: (state, action) => {
    if (action.LX === 1) {
      return {
        ...state, cityData: action.resultArr, currentPro: action.GUID, areaData: [],
      }
    }
    return {
      ...state, areaData: action.resultArr, currentCity: action.GUID
    }
  },
  [GET_AREA_OR_CITY_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: 'error',
    error: action.error
  }),
  [GET_LOCATION_DATA_PROVINCE_ERROR]: (state, action) => Object.assign({}, state, {
    status: 'error',
    error: action.error
  }),
  [INIT_LOCATION_DATA]: state => Object.assign({}, state, {
    status: false,
    cityData: [],
    areaData: [],
    allAreaArr: [],
    currentPro: '',
    currentCity: ''
  }),
  [initAllLocationData]: state => Object.assign({}, state, {
    status: false,
    provinceData: [],
    allAreaArr: [],
    cityData: [],
    areaData: [],
    currentPro: '',
    currentCity: ''
  })
}

// REDUCER
const initialState = {
  status: false,
  provinceData: [],
  cityData: [],
  allAreaArr: [],
  areaData: [],
  currentPro: '',
  currentCity: '',
  allLocationDara: []
}

export default function LocationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

