/**
 * Created by liuyali on 2016/11/17.
 */
export const CHECK_SINGLE_PROFITLOSS_DETAIL = 'CHECK_SINGLE_PROFITLOSS_DETAIL';
export const CHECK_SINGLE_PROFITLOSS_DETAIL_SUCCESS = 'CHECK_SINGLE_PROFITLOSS_DETAIL_SUCCESS';
export const CHECK_SINGLE_PROFITLOSS_DETAIL_ERROR = 'CHECK_SINGLE_PROFITLOSS_DETAIL_ERROR';

export function checkSingleProfitLossDetail(id) {
  return {
    type: CHECK_SINGLE_PROFITLOSS_DETAIL,
    payload: {
      id
    }
  }
}


const ACTION_HANDLERS = {
  [CHECK_SINGLE_PROFITLOSS_DETAIL_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.response,
  }),
  [CHECK_SINGLE_PROFITLOSS_DETAIL_ERROR]: (state, action) => Object.assign({}, state, {
    status: 'error',
    error: action.error
  }),
};

const initialState = {
  status: false,
  data: [],
}


export default function checkSingleProfitLossDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
