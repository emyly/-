/**
 * Created by NXQ on 12/14/2016.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_PERSONALIZED_TEMPLATE_DATA = 'GET_PERSONALIZED_TEMPLATE_DATA';
export const GET_PERSONALIZED_TEMPLATE_DATA_SUCCESS = 'GET_PERSONALIZED_TEMPLATE_DATA_SUCCESS';
export const DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA = 'DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA';
export const DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA_SUCCESS = 'DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA_SUCCESS';
export const DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA_FAIL = 'DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function getPersonalizedTemplateData(obj) {
  return {
    type: GET_PERSONALIZED_TEMPLATE_DATA,
    payload: {
      ...obj                                    // 需要查看的参数条件对象
    }
  }
}

export function deletePersonalizedSingleTemplateData(deleteObject) {
  return {
    type: DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA,
    payload: deleteObject                       // 要删除的单个模板数据对象
  }
}


export const actions = {
  getPersonalizedTemplateData,
  deletePersonalizedSingleTemplateData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PERSONALIZED_TEMPLATE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    allTemplateData: action.allTemplateDataResponse,
    publicTemplateData: action.publicTemplateDataResponse,
    companyPublicTemplateData: action.companyPublicTemplateDataResponse,
    privateTemplateData: action.privateTemplateDataResponse,

  }),
  [DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    deleteObject: action.deleteObject
  }),
  [DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA_FAIL]: (state, action) =>   // 后期需要处理删除失败后状态展示
     Object.assign({}, state, {
       deleteObject: {}
     })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  allTemplateData: [],            // 全部模板数据
  publicTemplateData: [],         // 公开模板数据
  companyPublicTemplateData: [],  // 公司公开模板数据
  privateTemplateData: [],        // 私有模板数据
  deleteObject: {}                // 已删除的私人模板对象
};
export default function personalizedTemplateReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
