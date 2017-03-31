/**
 * Created by liuyali on 2016/11/23.
 */
export const SURGERY_RECOVERY_GOODS_SUMMARY = 'SURGERY_RECOVERY_GOODS_SUMMARY';
export const SURGERY_RECOVERY_GOODS_SUMMARY_SUCCESS = 'SURGERY_RECOVERY_GOODS_SUMMARY_SUCCESS';
export const SURGERY_RECOVERY_GOODS_SUMMARY_ERROR = 'SURGERY_RECOVERY_GOODS_SUMMARY_ERROR';

export const SUBMIT_THIS_TIME_RECOVERY_GOODS = 'SUBMIT_THIS_TIME_RECOVERY_GOODS';
export const SUBMIT_THIS_TIME_RECOVERY_GOODS_SUCCESS = 'SUBMIT_THIS_TIME_RECOVERY_GOODS_SUCCESS';
export const SUBMIT_THIS_TIME_RECOVERY_GOODS_ERROR = 'SUBMIT_THIS_TIME_RECOVERY_GOODS_ERROR';

export const SURGERY_RECOVERY_GOODS_SUMMARY_CLEAR_ALL = 'SURGERY_RECOVERY_GOODS_SUMMARY_CLEAR_ALL';

/* 筛选*/
export const FILTER_RECOVERY_GOODS = 'FILTER_RECOVERY_GOODS';
export const FILTER_RECOVERY_GOODS_FAIL = 'FILTER_RECOVERY_GOODS_FAIL';

/* 扫描或者手动修改本次回收或者本次使用的数量*/
export const ADD_OR_SUBSTRACT_SURGERY_RECOVERY_GOODS_NUM = 'ADD_OR_SUBSTRACT_SURGERY_RECOVERY_GOODS_NUM';
//
// /*修改未回收数量*/
export const EIDT_UN_SURGERY_RECOVERY_GOODS = 'EIDT_UN_SURGERY_RECOVERY_GOODS';


export function surgeryRecoveryGoodsSummary(id) {
  return {
    type: SURGERY_RECOVERY_GOODS_SUMMARY,
    id
  }
}


export function addOrSubstractSurgeryRecoveryGoodsNum(SM, SPPHID, num) {
  return {
    type: ADD_OR_SUBSTRACT_SURGERY_RECOVERY_GOODS_NUM,
    SM,
    SPPHID,
    num
  }
}
export function submitRecoveryGoods(DDID, data, params) {
  return {
    type: SUBMIT_THIS_TIME_RECOVERY_GOODS,
    DDID,
    data,
    params
  }
}

export function filterRecoveryGoods(filter) {
  return {
    type: FILTER_RECOVERY_GOODS,
    filter
  }
}

export function surgeryRecoveryGoodsSummaryClearAll() {
  return {
    type: SURGERY_RECOVERY_GOODS_SUMMARY_CLEAR_ALL,
  }
}

export function editUnSurgeryRecoveryGoods(LX, SPPHID, value) {
  return {
    type: EIDT_UN_SURGERY_RECOVERY_GOODS,
    LX,
    SPPHID,
    value
  }
}

const ACTION_HANDLERS = {
  [FILTER_RECOVERY_GOODS]: (state, action) => {
    const filteredData = state.goodSummaryData.filter((value, index) => {
      return (value.SPBH.indexOf(action.filter) !== -1 || value.SPPH.indexOf(action.filter) !== -1 || value.SPMS.indexOf(action.filter) !== -1);
    });
    return { ...state, data: filteredData, status: true };
  },
  [FILTER_RECOVERY_GOODS_FAIL]: (state, action) => Object.assign({}, state.data, {
    status: false,
    error: new Error('筛选失败！')
  }),
  [SURGERY_RECOVERY_GOODS_SUMMARY_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.response,
    goodSummaryData: action.response,
  }),
  [SURGERY_RECOVERY_GOODS_SUMMARY_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: false,
    error: action.error
  }),
  [SUBMIT_THIS_TIME_RECOVERY_GOODS_SUCCESS]: state => Object.assign({}, state, {
    subStatus: true,
  }),
  [SUBMIT_THIS_TIME_RECOVERY_GOODS_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: false,
    error: action.error
  }),
  [SURGERY_RECOVERY_GOODS_SUMMARY_CLEAR_ALL]: state => Object.assign({}, state, {
    status: false,
    subStatus: false,
    data: []
  }),
  [EIDT_UN_SURGERY_RECOVERY_GOODS]: (state, action) => {
    const tempState = { ...state };
    tempState.currentID = null;

    if (action.LX === 1) {
      tempState.data.map((SP) => {
        if (SP.SPPHID === action.SPPHID) {
          SP.WMQS = action.value;
          SP.BCHS = Object.prototype.toString.call(SP.BCSH) === '[object Number]' ? SP.BCHS : 0;
          SP.BCSH = SP.SL - SP.BCHS - SP.LCSY - SP.LCHS - SP.WMQS;
        }
      });
    } else {
      tempState.data.map((SP) => {
        if (SP.SPPHID === action.SPPHID) {
          SP.WMQS = action.value;
          SP.BCSH = Object.prototype.toString.call(SP.BCSH) === '[object Number]' ? SP.BCSH : 0;
          SP.BCHS = SP.SL - SP.BCSH - SP.LCSY - SP.LCHS - SP.WMQS;
        }
      });
    }

    return Object.assign({}, state, tempState);
  },
  [ADD_OR_SUBSTRACT_SURGERY_RECOVERY_GOODS_NUM]: (state, action) => {
    const tempState = { ...state };

    if (action.SM === 1) {
            /* 扫描实物*/
      tempState.data.map((SP) => {
        if (SP.SPPHID === action.SPPHID) {
          SP.BCSH = Object.prototype.toString.call(SP.BCSH) === '[object Number]' ? SP.BCSH : SP.WHS;
          SP.BCHS = Object.prototype.toString.call(SP.BCHS) === '[object Number]' ? SP.BCHS : 0;
          if (SP.BCSH - action.num >= 0) {
            SP.BCHS += action.num;
            SP.BCSH -= action.num;
            tempState.currentID = action.SPPHID;
          }
        }
      });
    } else {
            /* 扫描条码*/
      tempState.data.map((SP) => {
        if (SP.SPPHID === action.SPPHID) {
          SP.BCHS = Object.prototype.toString.call(SP.BCHS) === '[object Number]' ? SP.BCHS : SP.WHS;
          SP.BCSH = Object.prototype.toString.call(SP.BCSH) === '[object Number]' ? SP.BCSH : 0;
          if (SP.BCHS - action.num >= 0) {
            SP.BCSH += action.num;
            SP.BCHS -= action.num;
            tempState.currentID = action.SPPHID;
          }
        }
      })
    }
    return Object.assign({}, state, tempState);
  },

};

const initialState = {
  status: false,
  subStatus: false,
  data: []
}

export default function surgeryRecoveryGoodsSummaryReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
