/**
 * Created by liuyali on 2017/1/4.
 */
export const GET_ORDER_GOODS_DETAIL_AND_BILLS = 'GET_ORDER_GOODS_DETAIL_AND_BILLS';
export const GET_ORDER_GOODS_DETAIL_AND_BILLS_ERROR = 'GET_ORDER_GOODS_DETAIL_AND_BILLS_ERROR';
export const GET_ORDER_GOODS_DETAIL_AND_BILLS_SUCCESS = 'GET_ORDER_GOODS_DETAIL_AND_BILLS_SUCCESS';
export const RESET_GET_ORDER_GOODS_DETAIL_AND_BILLS = 'RESET_GET_ORDER_GOODS_DETAIL_AND_BILLS';

export function getOrderGoodsDetailAndBills(SHJXSID,ddid, LX, params) {
  return {
    type: GET_ORDER_GOODS_DETAIL_AND_BILLS,
    ddid, LX, params,SHJXSID
  }
}
export function resetOrderGoodsDetailAndBills() {
  return {
    type: RESET_GET_ORDER_GOODS_DETAIL_AND_BILLS
  }
}
const ACTION_HANDLERS = {
  [GET_ORDER_GOODS_DETAIL_AND_BILLS_ERROR]: (state, action) => ({
    ...state, status: false, error: action.error
  }),
  [GET_ORDER_GOODS_DETAIL_AND_BILLS_SUCCESS]: (state, action) => {
    if (action.LX === 1) {
      const flag = action.response.SPWZ.length > 0 ? true : false;
      return {
        ...state,
        status: true,
        data: action.response.CRKMXB,
        FPdata: action.response.SPWZ,
        hasFPStatus: flag,
        ddid: action.ddid,
        SHJXSID:action.SHJXSID
      }
    } else {
      const tempState = { ...state };
      tempState.goodFPdata = { ...tempState.goodFPdata, [action.params.SPID]: action.response.SPWZ };
      return {
        ...state,
        ...tempState
      }
    }
  },
  [RESET_GET_ORDER_GOODS_DETAIL_AND_BILLS]: (state) => ({
    status: false,
    hasFPStatus: false,
    data: [],
    FPdata: [],
    goodFPdata: {}
  })

}

const initialState = {
  status: false,
  hasFPStatus: false,
  data: [],
  FPdata: [],
  goodFPdata: {}
}

export default function DetectionBillsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
