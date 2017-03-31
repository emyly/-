/**
 * Created by liuyali on 2016/11/17.
 */
export const GET_PROFITLOSS_LIST = 'GET_PROFITLOSS_LIST';
export const GET_PROFITLOSS_LIST_SUCCESS = 'GET_PROFITLOSS_LIST_SUCCESS';
export const GET_PROFITLOSS_LIST_ERROR = 'GET_PROFITLOSS_LIST_ERROR';

export function getProfitLossList(page = 1) {
  return {
    type: GET_PROFITLOSS_LIST,
    payload: {
      page
    }
  }
}


const ACTION_HANDLERS = {
  [GET_PROFITLOSS_LIST_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.payload.resultArr,
    currentPage: action.payload.cPage || 1,
    total: action.payload.total
  }),
  [GET_PROFITLOSS_LIST_ERROR]: (state, action) => Object.assign({}, state, {
    status: 'error',
    error: action.error
  }),
};

const initialState = {
  status: false,
  data: []
}


export default function getProfitLossListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
