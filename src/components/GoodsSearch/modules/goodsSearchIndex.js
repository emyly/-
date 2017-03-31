/**
 * Created by liuyali on 2016/12/7.
 */

/* 获取业务线筛选器*/
export const GET_FILTER_LOB_DATA = 'GET_FILTER_LOB_DATA'
export const GET_FILTER_LOB_DATA_SUCCESS = 'GET_FILTER_LOB_DATA_SUCCESS'
export const GET_FILTER_LOB_DATA_ERROR = 'GET_FILTER_LOB_DATA_ERROR'

/* 获取品牌筛选器*/
export const GET_FILTER_BRAND_DATA = 'GET_FILTER_BRAND_DATA'
export const GET_FILTER_BRAND_DATA_SUCCESS = 'GET_FILTER_BRAND_DATA_SUCCESS'
export const GET_FILTER_BRAND_DATA_ERROR = 'GET_FILTER_BRAND_DATA_ERROR'

/* 获取物权筛选器*/
export const GET_FILTER_PROPERTY_DATA = 'GET_FILTER_PROPERTY_DATA'
export const GET_FILTER_PROPERTY_DATA_SUCCESS = 'GET_FILTER_PROPERTY_DATA_SUCCESS'
export const GET_FILTER_PROPERTY_DATA_ERROR = 'GET_FILTER_PROPERTY_DATA_ERROR'

/* 获取包装筛选器*/
export const GET_FILTER_PACK_DATA = 'GET_FILTER_PACK_DATA'
export const GET_FILTER_PACK_DATA_SUCCESS = 'GET_FILTER_PACK_DATA_SUCCESS'
export const GET_FILTER_PACK_DATA_ERROR = 'GET_FILTER_PACK_DATA_ERROR'

/* 获取效期筛选器*/
export const GET_FILTER_EXPIREDATA_DATA = 'GET_FILTER_EXPIREDATA_DATA'
export const GET_FILTER_EXPIREDATA_DATA_SUCCESS = 'GET_FILTER_EXPIREDATA_DATA_SUCCESS'
export const GET_FILTER_EXPIREDATA_DATA_ERROR = 'GET_FILTER_EXPIREDATA_DATA_ERROR'

/* 获取关键字筛选器*/
export const GET_FILTER_KEYWORDS_DATA = 'GET_FILTER_KEYWORDS_DATA'
export const GET_FILTER_KEYWORDS_DATA_SUCCESS = 'GET_FILTER_KEYWORDS_DATA_SUCCESS'
export const GET_FILTER_KEYWORDS_DATA_ERROR = 'GET_FILTER_KEYWORDS_DATA_ERROR'


/* 获取业务线筛选器*/
export function getFilterLobData() {
  return {
    type: GET_FILTER_LOB_DATA,
  }
}
/* 获取品牌筛选器*/
export function getFilterBrandData() {
  return {
    type: GET_FILTER_BRAND_DATA,
  }
}
/* 获取物权筛选器*/
export function getFilterPropertyData() {
  return {
    type: GET_FILTER_PROPERTY_DATA,
  }
}

/* 获取包装筛选器*/
export function getFilterPackData() {
  return {
    type: GET_FILTER_PACK_DATA,
  }
}
/* 获取效期筛选器*/
export function getFilterExpireDateData() {
  return {
    type: GET_FILTER_EXPIREDATA_DATA,
  }
}
/* 获取关键字筛选器*/
export function getFilterKeywordsData() {
  return {
    type: GET_FILTER_KEYWORDS_DATA,
  }
}

const ACTION_HANDLERS = {
  [GET_FILTER_LOB_DATA_SUCCESS]: (state, action) => ({
    ...state,
    lob: { status: true, data:action.response },
  }),

  [GET_FILTER_BRAND_DATA_SUCCESS]: (state, action) => ({
    ...state,
    brand: { status: true, data: action.response },
  }),
  [GET_FILTER_PROPERTY_DATA_SUCCESS]: (state, action) => ({
    ...state,
    property: { status: true, data: action.response },
  }),
  [GET_FILTER_PACK_DATA_SUCCESS]: (state, action) => ({
    ...state,
    pack: { status: true, data:action.response },
  }),
  [GET_FILTER_EXPIREDATA_DATA_SUCCESS]: (state, action) => ({
    ...state,
    expireDate: { status: true, data: action.response },
  }),
  [GET_FILTER_KEYWORDS_DATA_SUCCESS]: (state, action) => ({
    ...state,
    keyWords: { status: true, data:action.response },
  }),

  /* error处理*/
  [GET_FILTER_LOB_DATA_ERROR]: (state) => ({
    ...state,
    lob: { ...state.lob, status: false },
  }),

  [GET_FILTER_BRAND_DATA_ERROR]: (state, action) => ({
    ...state,
    brand: { ...state.brand, status: false },
  }),
  [GET_FILTER_PROPERTY_DATA_ERROR]: (state) => ({
    ...state,
    property: { ...state.property, status: false },
  }),
  [GET_FILTER_PACK_DATA_ERROR]: (state) => ({
    ...state,
    pack: { ...state.property, status: false },
  }),
  [GET_FILTER_EXPIREDATA_DATA_ERROR]: (state) => ({
    ...state,
    expireDate: { ...state.expireDate, status: false },
  }),
  [GET_FILTER_KEYWORDS_DATA_ERROR]: (state) => ({
    ...state,
    keyWords: { ...state.keyWords, status: false },
  })
}

// REDUCER
const initialState = {
  lob: { status: false, data: [] },
  brand: { status: false, data: [] },
  property: { status: false, data: [] },
  pack: { status: false, data: [] },
  expireDate: { status: false, data: [] },
  keyWords: { status: false, data: [] },
}

export default function goodsFiltersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
