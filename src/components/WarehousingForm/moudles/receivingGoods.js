/**
 * receivingGoods
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
/*
* 提交入库商品
* */
export const UPDATE_RECEIVING_GOODS = 'UPDATE_RECEIVING_GOODS'
export const UPDATE_RECEIVING_GOODS_SUCCESS = 'UPDATE_RECEIVING_GOODS_SUCCESS'
export const UPDATE_RECEIVING_GOODS_FAIL = 'UPDATE_RECEIVING_GOODS_FAIL'
export const UPDATE_RECEIVING_GOODS_STATUS_FALSE = 'UPDATE_RECEIVING_GOODS_STATUS_FALSE'
export const UPDATE_RECEIVING_GOODS_STATUS_CLEAR = 'UPDATE_RECEIVING_GOODS_STATUS_CLEAR';

/**
 * updateReceivingGoods - description
 *
 * @param  {object} receivingGoods 详见 生产出入库 API
 * @return {type}                description
 */
export function updateReceivingGoods(receivingGoods, atPerson, message) {
  return {
    type: UPDATE_RECEIVING_GOODS,
    receivingGoods, atPerson, message
  }
}

export function updateReceivingGoodsSuccess() {
  return {
    type: UPDATE_RECEIVING_GOODS_SUCCESS,
  }
}

export function updateReceivingGoodsFail(error) {
  return {
    type: UPDATE_RECEIVING_GOODS_FAIL,
    error
  }
}
export function clearGoods() {
  return {
    type: UPDATE_RECEIVING_GOODS_STATUS_CLEAR
  }
}
export function updateReceivingGoodsStatusFalse() {
  return {
    type: UPDATE_RECEIVING_GOODS_STATUS_FALSE,
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {

  [UPDATE_RECEIVING_GOODS_SUCCESS]: (state, action) => Object.assign({}, state, {
    goodsReceive: true,
    status: true
  }),

  [UPDATE_RECEIVING_GOODS_FAIL]: (state, action) => ({
    status: false,
    error: action.error
  }),
  [UPDATE_RECEIVING_GOODS_STATUS_FALSE]: (state, action) => Object.assign({}, state, {
    status: false
  }),
  [UPDATE_RECEIVING_GOODS_STATUS_CLEAR]: (state, action) => Object.assign({}, state, {
    goodsReceive: false,
    status: false
  })

}

const initialState = {
  status: false
}

export default function updateReceivingGoodsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
