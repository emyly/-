/**
 * Created by liuyali on 2017/1/4.
 */
export const GET_ORDER_GOODS_DETAIL_AND_BILLS = 'GET_ORDER_GOODS_DETAIL_AND_BILLS';
export const GET_ORDER_GOODS_DETAIL_AND_BILLS_ERROR = 'GET_ORDER_GOODS_DETAIL_AND_BILLS_ERROR';
export const GET_ORDER_GOODS_DETAIL_AND_BILLS_SUCCESS = 'GET_ORDER_GOODS_DETAIL_AND_BILLS_SUCCESS';

export function getOrderGoodsDetailAndBills(ddid, LX, params) {
  return {
    type: GET_ORDER_GOODS_DETAIL_AND_BILLS,
    ddid, LX, params
  }
}
const ACTION_HANDLERS = {
  [GET_ORDER_GOODS_DETAIL_AND_BILLS_ERROR]: (state, action) => ({
    ...state, status: false, error: action.error
  }),
  [GET_ORDER_GOODS_DETAIL_AND_BILLS_SUCCESS]: (state, action) => {
    if (action.LX === 1) {
      return {
        ...state,
        status: true,
        data: action.response.CRKMXB,
        FPdata: action.response.SPWZ,
      }
    } else {
      const tempState = { ...state };
      tempState.goodFPdata = { ...tempState.goodFPdata, [action.params.SPID]: action.response.SPWZ };
      return {
        ...state,
        ...tempState
      }
    }
  }
}

const initialState = {
  status: false,
  data: [],
  FPdata: [],
  goodFPdata: {}
}

export default function DetectionBillsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
