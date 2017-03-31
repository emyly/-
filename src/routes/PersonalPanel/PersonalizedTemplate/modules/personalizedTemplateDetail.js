/**
 * Created by NXQ on 12/14/2016.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_PERSONALIZED_SINGLE_TEMPLATE_GOODS_DATA = 'GET_PERSONALIZED_SINGLE_TEMPLATE_GOODS_DATA';
export const GET_PERSONALIZED_SINGLE_TEMPLATE_GOODS_DATA_SUCCESS = 'GET_PERSONALIZED_SINGLE_TEMPLATE_GOODS_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getPersonalizedSingleTemplateGoodsData(id) {
  return {
    type: GET_PERSONALIZED_SINGLE_TEMPLATE_GOODS_DATA,
    payload: {
      id                                   // 需要查看的模板ID
    }
  }
}


export const actions = {
  getPersonalizedSingleTemplateGoodsData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PERSONALIZED_SINGLE_TEMPLATE_GOODS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    singleTemplateGoodsData: action.singleTemplateGoodsDataResponse
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  singleTemplateGoodsData: [],            // 模板关联的商品数据
};
export default function personalizedTemplateDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
