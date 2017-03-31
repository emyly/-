/**
 * Created by sjf on 2016/10/20.
 */
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

import orderCheck from './containers/OrderCheckContainer';
import orderSummary from './containers/OrderSummaryContainer';

/**
 * 使用场景：外审
 */
// Sync route definition
export default store => ({
  path: 'orderCheckList',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const orderCheckListComponent = require('./components/OrderCheckList').default;
      const successRaisedButton = require('./modules/successRaisedButton').default;
      const backRaisedButton = require('./modules/backRaisedButton').default;

      injectReducer(store, {
        key: 'orderCheckList',
        reducer: combineReducers({
          successRaisedButton,
          backRaisedButton
        })
      })
      cb(null, orderCheckListComponent)
    }, 'orderCheckList')
  },
  indexRoute: { component: orderSummary },
  childRoutes: [
    {
      path: 'orderCheck/:id',
      component: orderCheck
    }
  ],

})
