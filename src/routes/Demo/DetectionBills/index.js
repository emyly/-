/**
 * Created by liuyali on 2017/1/4.
 */
import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'detectionBills',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const detectionBillsContainer = require('./containers/DetectionBillsContainer').default
      const DetectionBillsReducer = require('./modules/detectionBills').default
      injectReducer(store, { key: 'DetectionBillsReducer', reducer: DetectionBillsReducer })

      cb(null, detectionBillsContainer)
    }, 'detectionBillsContainer')
  }
})
