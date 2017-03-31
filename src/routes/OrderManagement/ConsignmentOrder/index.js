import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

import ConsignmentOrderList from './containers/ConsignmentOrderList';
import CreateConsignmentOrder from './containers/CreateConsignmentOrder';
import ConsignmentOrderDetail from './containers/ConsignmentOrderDetail';


/**
 * 使用场景：寄售订单下单
 */
export default store => ({
  path: 'consignmentOrder',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ConsignmentOrder = require('./components/ConsignmentOrder').default;
      const createConsignmentOrder = require('./modules/createConsignmentOrder').default;

      injectReducer(store, {
        key: 'consignmentOrder',
        reducer: combineReducers({
          createConsignmentOrder
        })
      })
      cb(null, ConsignmentOrder)
    }, 'consignmentOrder')
  },
  indexRoute: { component: ConsignmentOrderList },
  childRoutes: [
    {
      path: 'createConsignmentOrder',
      component: CreateConsignmentOrder
    },
    {
      path: ':id',
      component: ConsignmentOrderDetail
    }
  ],
})
