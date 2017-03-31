// ------------------------------------
// Constants
// ------------------------------------
export const GET_BARCODEOUT_DATA = 'GET_BARCODEOUT_DATA'
export const GET_BARCODEOUT_DATA_SUCCESS = 'GET_BARCODEOUT_DATA_SUCCESS'
export const GET_BARCODEOUT_DATA_FAIL = 'GET_BARCODEOUT_DATA_FAIL'
export const GET_BARCODEIN_DATA = 'GET_BARCODEIN_DATA'
export const GET_BARCODEIN_DATA_SUCCESS = 'GET_BARCODEIN_DATA_SUCCESS'
export const GET_BARCODEIN_DATA_FAIL = 'GET_BARCODEIN_DATA_FAIL'
export const BARCODE_CLEAR_ERROR_MSG = 'BARCODE_CLEAR_ERROR_MSG'
export const GET_TRAN_GOODS = 'barCodeTextFieldGET_TRAN_GOODS'
export const GET_TRAN_GOODS_SUCCESS = 'barCodeTextFieldGET_TRAN_GOODS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function clearErrorMsg() {
  return {
    type: BARCODE_CLEAR_ERROR_MSG
  }
}

export function getBarcodeOut(params) {
  return {
    type: GET_BARCODEOUT_DATA,
    payload: params
  }
}

export function getBarcodeIn(params) {
  return {
    type: GET_BARCODEIN_DATA,
    payload: params
  }
}

export function getTranGood(params) {
  return {
    type: GET_TRAN_GOODS,
    payload: params
  }
}

export const actions = {
  getBarcodeOut,
  getBarcodeIn,
  getTranGood
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_BARCODEOUT_DATA]: (state, action) => state,
  [GET_BARCODEOUT_DATA_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      status: true,
      barCodeData: action.response,
      error: ''
    })
  },
  [GET_BARCODEOUT_DATA_FAIL]: (state, action) => {
    return Object.assign({}, state, {
      status: false,
      error: action.response,
      barCodeData: {},
      transferData: [],
    })
  },
  [GET_BARCODEIN_DATA]: (state, action) => state,
  [GET_BARCODEIN_DATA_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      status: true,
      barCodeData: action.response,
      transferData: [],
      error: ''
    })
  },
  [GET_BARCODEIN_DATA_FAIL]: (state, action) => {
    return Object.assign({}, state, {
      status: false,
      error: action.response,
      barCodeData: {},
      transferData: [],
    })
  },
  [BARCODE_CLEAR_ERROR_MSG]: (state, action) => Object.assign({}, state, {
    status: true,
    error: null,
    barCodeData: {},
    transferData: [],
  }),
  [GET_TRAN_GOODS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      status: true,
      transferData: action.response,
      error: '',
      barCodeData: {},
    })
  }

};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  barCodeData: {},
  transferData: [],
  error: null,
}

export default function barCodeTextFieldReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
