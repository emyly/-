// ------------------------------------
// Constants
// ------------------------------------
export const GET_PICK_PRODUCTION_DATA = 'GET_PICK_PRODUCTION_DATA';
export const GET_PICK_PRODUCTION_DATA_SUCCESS = 'GET_PICK_PRODUCTION_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------
export function getProductionData(barCode, KWID) {
  return {
    type: GET_PICK_PRODUCTION_DATA,
    payload: {
      barCode,
      KWID
    }
  }
}

export const actions = {
  getProductionData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PICK_PRODUCTION_DATA]: (state, action) => state,
  [GET_PICK_PRODUCTION_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    productionData: action.response
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  productionData: {},
};

export default function pickProductionDialogReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
