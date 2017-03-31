/**
 * Created by wmt on 2016/11/29.
 */
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

import SurgeryOrderDetail from './containers/SurgeryOrderDetailContainer';
import SurgeryOrderList from './containers/SurgeryOrderListContainer';
import CreateOrder from './containers/CreateOrderContainer';

/**
 * 使用场景：手术订单下单
 */
export default store => ({
  path: 'surgeryOrder',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const SurgeryOrder = require('./components/SurgeryOrder').default;
      const createOrder = require('./modules/createOrder').default;
      const postChangeLocationData = require('../WarehouseGeneral/components/ChooseReceiveAddress/modules/chooseReceiveAddress').default;
      injectReducer(store, {
        key: 'surgeryOrder',
        reducer: combineReducers({
          createOrder,postChangeLocationData
        })
      })
      cb(null, SurgeryOrder)
    }, 'surgeryOrder')
  },
  indexRoute: { component: SurgeryOrderList },
  childRoutes: [
    {
      path: 'createOrder',
      component: CreateOrder
    },
    {
      path: ':id',
      component: SurgeryOrderDetail
    }
  ],
})
