/**
 * Created by liuyali on 2017/1/17.
 */
export const GET_ORDERLIST_FOR_DETECTION = 'GET_ORDERLIST_FOR_DETECTION';
export const GET_ORDERLIST_FOR_DETECTION_SUCCESS = 'GET_ORDERLIST_FOR_DETECTION_SUCCESS'
export const GET_ORDERLIST_FOR_DETECTION_ERROR = 'GET_ORDERLIST_FOR_DETECTION_ERROR'
/* 获取所有的组织机构*/
export const GET_ALL_ORG_LIST_FOR_DETECT = 'GET_ALL_ORG_LIST_FOR_DETECT';
export const GET_ALL_ORG_LIST_FOR_DETECT_SUCCESS = 'GET_ALL_ORG_LIST_FOR_DETECT_SUCCESS';
export const GET_ALL_ORG_LIST_FOR_DETECT_ERROR = 'GET_ALL_ORG_LIST_FOR_DETECT_ERROR';

export function orderlistForDetection(page, params) {
  return {
    type: GET_ORDERLIST_FOR_DETECTION,
    page, params
  }
}
export function getRelatedOrgNoPage(id, params) {
  return {
    type: GET_ALL_ORG_LIST_FOR_DETECT,
    id, params
  }
}
const ACTION_HANDLERS = {
  [GET_ORDERLIST_FOR_DETECTION_SUCCESS]: (state, action) => ({
    ...state,
    status: true,
    data: action.resultArr,
    currentPage: action.page || 1,
    total: action.total
  }),
  [GET_ORDERLIST_FOR_DETECTION_ERROR]: (state, action) => ({ ...state,
    status: false,
    error: action.error }),
  [GET_ALL_ORG_LIST_FOR_DETECT_SUCCESS]: (state, action) => ({
    ...state,
    getOrgStatus: true,
    orgData: action.resultArr
  }),
  [GET_ALL_ORG_LIST_FOR_DETECT_ERROR]: (state, action) => ({ ...state,
    getOrgStatus: false,
    getOrgError: action.error }),
};

const initialState = {
  status: false,
  getOrgStatus: false,
  data: [],
  orgData: []
}

export default function orderlistForDetectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
