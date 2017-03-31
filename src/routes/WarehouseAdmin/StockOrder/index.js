/**
 * Created by wmt on 2016/11/29.
 */
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

import StockOrderDetail from './containers/StockOrderDetailContainer';
import StockOrderList from './containers/StockOrderListContainer';
import CreateStockOrder from './containers/CreateStockOrderContainer';

/**
 * 使用场景：备货订单下单
 */
export default store => ({
  path: 'stockOrder',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const StockOrder = require('./components/StockOrder').default;
      const createStockOrder = require('./modules/createStockOrder').default;

      injectReducer(store, {
        key: 'stockOrder',
        reducer: combineReducers({
          createStockOrder
        })
      })
      cb(null, StockOrder)
    }, 'stockOrder')
  },
  indexRoute: { component: StockOrderList },
  childRoutes: [
    {
      path: 'createStockOrder',
      component: CreateStockOrder
    },
    {
      path: ':id',
      component: StockOrderDetail
    }
  ],
})
