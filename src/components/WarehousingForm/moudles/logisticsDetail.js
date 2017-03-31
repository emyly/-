/**
 * logisticsDetail
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */

  /*
  * 根据物流单号获取商品列表
  * */

export const FETCH_SINGLE_LOGISTICS_DETAIL = 'FETCH_SINGLE_LOGISTICS_DETAIL';
export const FETCH_SINGLE_LOGISTICS_DETAIL_SUCCESS = 'FETCH_SINGLE_LOGISTICS_DETAIL_SUCCESS';
export const FETCH_SINGLE_LOGISTICS_DETAIL_FAIL = 'FETCH_SINGLE_LOGISTICS_DETAIL_FAIL';
export const FETCH_SINGLE_LOGISTICS_DETAIL_CLEAR = 'FETCH_SINGLE_LOGISTICS_DETAIL_CLEAR';
export const DEAL_CURRENT_WLD_SUCCESS = 'DEAL_CURRENT_WLD_SUCCESS';
export const ADD_OR_SUBTRACT = 'ADD_OR_SUBTRACT';
export const MOD_CURRENT_KWID = 'MOD_CURRENT_KWID';
/**
 * fetchSingleLogisticsDetail - description
 *
 * @param  {string} ddid 订单ID
 * @param  {string} wldh 物流单号
 * @return {type}      description
 */
export function fetchSingleLogisticsDetail(ddid, wldh) {
  return {
    type: FETCH_SINGLE_LOGISTICS_DETAIL,
    ddid,
    wldh
  }
}
export function clearData() {
  return {
    type: FETCH_SINGLE_LOGISTICS_DETAIL_CLEAR
  }
}
export function fetchSingleLogisticsDetailSuccess(result) {
  return {
    type: FETCH_SINGLE_LOGISTICS_DETAIL_SUCCESS,
    response: result
  }
}

export function fetchSingleLogisticsDetailFail(error) {
  return {
    type: FETCH_SINGLE_LOGISTICS_DETAIL_FAIL,
    error
  }
}
export function dealCurrentWLDSuccess(id) {
  return {
    type: DEAL_CURRENT_WLD_SUCCESS,
    id
  }
}

export function addOrSubtract(kwid, wldh, ddid, ddlx, spph, spbh, mount, data) {
  return {
    type: ADD_OR_SUBTRACT,
    kwid,
    wldh,
    ddid,
    ddlx,
    spph,
    spbh,
    mount,
    data
  }
}


export function modCurrentKWID(id, name, currentKWLX, currentGoods) {
  return {
    type: MOD_CURRENT_KWID,
    id,
    name,
    currentKWLX,
    currentGoods

  }
}
const ACTION_HANDLERS = {
  [FETCH_SINGLE_LOGISTICS_DETAIL_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: Object.assign({}, state.data, { [action.response.wldh]: action.response.data }),
    error: ''

  }),


  [FETCH_SINGLE_LOGISTICS_DETAIL_FAIL]: (state, action) => Object.assign({}, state.data, {
    status: false,
    data: [],
    error: action.error
  }),
  [DEAL_CURRENT_WLD_SUCCESS]: (state, action) => Object.assign({}, state, {
    currentWLD: action.id

  }),
  [MOD_CURRENT_KWID]: (state, action) => Object.assign({}, state, {
    currentKWID: action.id,
    currentKWName: action.name
  }),
  [ADD_OR_SUBTRACT]: (state, action) => {
    // wldh,shph,mount,data
    let exitSPPHID = false;
    let exitWLDH = false;
    let breakFlag = false;
    let exitSPID = false;
    const newData = Object.assign({}, state);
    let SPMS;
    let SPXX;
    /*
    * 判定删除还是添加
    * */
    if (action.mount < 0) {
      newData.subFlag = true;
    } else {
      newData.subFlag = false;
    }
    newData.data[action.wldh].map((sp) => {
      /**/
      if (sp.SPPHID === action.data.SPPHID || (sp.SPID === action.data.SPID)) {
        if (sp.SYSL - action.mount < 0) {
          breakFlag = true;
        } else {
          sp.SYSL -= action.mount;
          sp.DRKSL += action.mount;
        }
        SPMS = sp.SPMS;
        SPXX = Object.assign({}, sp);
      }
    });
    if (breakFlag) {
      return Object.assign({}, state);
    }
    action.data.SPMS = SPMS;
    /* 提交数据中已经存在改商品*/
    if (newData && newData.subData && newData.subData[action.kwid]) {
      /*
      * subdata中已经存了库位的信息
      * */
      newData.subData[action.kwid].map((sub, index1) => {
        if (sub.CRKDB.WLDH === action.wldh) {
          /*
          * 库位下有对应的物流单
          * */

          if (action.mount > 0) {
            newData.currentWLDHindex = index1;
          }
          let WZ = 'INIT';
          sub.CRKMXB.map((sp, index2) => {
            if (sp.SPPHID === action.data.SPPHID || (sp.SPID === action.data.SPID)) {
              /*
              * 物流单存在，商品存在，扫描商品已经在物流单中
              * */
              if (action.mount > 0) {
                newData.currentSPIDindex = index2;
                exitSPID = true;
              }
              if (sp.SL + action.mount >= SPXX.SL - SPXX.YRKSL) {
                sp.SL = SPXX.SL - SPXX.YRKSL;
                sp.SPPHID = action.data.SPPHID;
                sp.SPPH = action.data.SPPH;
              } else {
                /*单个删除*/
                sp.SL += action.mount;
                sp.SPPHID = action.data.SPPHID;
                sp.SPPH = action.data.SPPH
              }
              if (sp.SL <= 0) {
                WZ = index2;
              }
              exitSPPHID = true;
            }
          });

          /*
          * 删除空的物流单
          * */
          if (WZ !== 'INIT') {
            sub.CRKMXB.splice(WZ, 1);
          }

          exitWLDH = action.wldh;

          if (!exitSPPHID && exitWLDH) {
            /* 物流单存在，商品不在物流单中*/
            newData.subData[action.kwid][index1].CRKMXB.push({ ...action.data, ...SPXX, KWID: action.kwid, SL: 1, SPPHID: action.data.SPPHID, SPPH: action.data.SPPH, SPPPID: action.data.SPPPID });
          }
        }
      });
      if (!exitWLDH && (SPXX.SL - SPXX.YRKSL > 0)) {
        /* 物流单号不存在*/
        const obj = {
          CRKDB: {
            WLDH: action.wldh, // 物流单号
            DDID: action.ddid, // 订单ID
            CKRK: '1', // 出库入库，0：出库，1：入库
            DDLX: action.ddlx// 订单类型，0：铺货订单，1：备货订单，2：手术订单，3：借货订单，4：调货订单， 5：铺货补货订单 6:铺货销售订单
          },
          CRKMXB: [{ ...action.data, ...SPXX, KWID: action.kwid, SL: 1, SPPHID: action.data.SPPHID, SPPH: action.data.SPPH, SPPPID: action.data.SPPPID }]
        }
        newData.subData[action.kwid].push(obj);
      }
    } else if (SPXX.SL - SPXX.YRKSL > 0) {
      const obj = {
        CRKDB: {
          WLDH: action.wldh, // 物流单号
          DDID: action.ddid, // 订单ID
          CKRK: '1', // 出库入库，0：出库，1：入库
          DDLX: action.ddlx// 订单类型，0：铺货订单，1：备货订单，2：手术订单，3：借货订单，4：调货订单， 5：铺货补货订单 6:铺货销售订单
        },
        CRKMXB: [{ ...action.data, ...SPXX, KWID: action.kwid, SL: 1, SPPHID: action.data.SPPHID, SPPH: action.data.SPPH, SPPPID: action.data.SPPPID }]
      }
      const ARR = [];
      ARR.push(obj);
      newData.subData = Object.assign({}, newData.subData, { [action.kwid]: ARR });
    }
    newData.currentSPID = action.data.SPID;
    if (!exitWLDH || action.mount) {
      newData.currentWLDHindex = -1;
    }
    if (!exitSPID || action.mount) {
      newData.currentSPIDindex = -1;
    }
    return Object.assign({}, newData)
  },

  [FETCH_SINGLE_LOGISTICS_DETAIL_CLEAR]: state => Object.assign({}, state, {
    status: false,
    data: [],
    subData: {},
    currentKWID: false,
    currentWLD: false,
    currentKWName: '',
    currentKWLX: 0,
    currentGoods: 0
  })
};

const initialState = {
  data: [],
  subData: {},
  currentKWID: false,
  currentWLD: false,
  currentKWName: '',
  currentKWLX: 0,
  currentGoods: 0
}

export default function singleLogisticsDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
