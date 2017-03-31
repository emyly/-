/**
 * Created by liuyali on 2017/1/4.
 */
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

import DetectionBillsIndex from './components/DetectionBillsIndex'
import detectionBillsContainer from './containers/DetectionBillsContainer'
import orderlistForDetection from './containers/OrderlistForDetectionContainer'
export default store => ({
  path: 'orderlistForDetection',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const orderlistForDetectionReducer = require('./modules/orderlistForDetection').default;
      const DetectionBillsReducer = require('./modules/detectionBills').default;

      injectReducer(store, { key: 'DetectionBill', reducer: combineReducers({
        orderlistForDetectionReducer,
        DetectionBillsReducer
      }) })
      cb(null, DetectionBillsIndex)
    }, 'orderlistForDetection')
  },
  indexRoute: {
    component: orderlistForDetection,
  },
  childRoutes: [
    {
      path: 'detectionBills',
      component: detectionBillsContainer
    }]
})
