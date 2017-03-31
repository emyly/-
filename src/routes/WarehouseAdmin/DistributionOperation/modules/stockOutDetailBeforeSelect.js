/**
 * Created by wangming on 11/18/2016.
 */

// ------------------------------------
// Constants
// ------------------------------------
import { GET_ORDERDETAIL_DATA_SUCCESS } from '../../../../components/OrderBasicInfoForm/modules/orderBasicInfoForm'


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ORDERDETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    orderData: action.response
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  orderData: {},
  errorData: {},
};

export default function getStockOutCurrentOrderDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
