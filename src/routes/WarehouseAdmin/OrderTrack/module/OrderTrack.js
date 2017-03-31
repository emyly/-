/**
 * Created by liuyali on 2016/12/14.
 */
export const GET_FILTER_ORDERLIST_DATA = 'GET_FILTER_ORDERLIST_DATA';
export const GET_FILTER_ORDERLIST_DATA_SUCCESS = 'GET_FILTER_ORDERLIST_DATA_SUCCESS';
export const GET_FILTER_ORDERLIST_DATA_ERROR = 'GET_FILTER_ORDERLIST_DATA_ERROR';

export function getFilterOrderListData(page = 1, params) {
  return {
    type: GET_FILTER_ORDERLIST_DATA,
    page,
    params
  }
}

const ACTION_HANDLERS = {
  [GET_FILTER_ORDERLIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.resultArr,
    currentPage: action.cPage,
    total: action.total
  }),
  [GET_FILTER_ORDERLIST_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.error
  }),
  //
};

const initialState = {
  status: false,
  data: []
}
export default function OrderTrackReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
