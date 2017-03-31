/**
 * Created by liuyali on 2016/11/22.
 */
export const GET_RELATED_ORG = 'GET_RELATED_ORG';
export const GET_RELATED_ORG_SUCCESS = 'GET_RELATED_ORG_SUCCESS';
export const GET_RELATED_ORG_ERROR = 'GET_RELATED_ORG_ERROR';

export function getRelatedOrg(page, id) {
  return {
    type: GET_RELATED_ORG,
    page, id
  }
}
const ACTION_HANDLERS = {
  [GET_RELATED_ORG_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.data,
    currentPage: action.currentPage,
    total: action.total
  }),
  [GET_RELATED_ORG_ERROR]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.error
  }),
};

const initialState = {
  status: false,
  data: []
}

export default function getRelatedOrgReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
