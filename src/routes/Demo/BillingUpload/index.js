/**
 * Created by liuyali on 2016/12/21.
 */
import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'billingUpload',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const BillingUploadContainer = require('./containers/BillingUploadContainer').default
      const BillingUploadReducer = require('./modules/billingUpload').default
      injectReducer(store, { key: 'billingUploadReducer', reducer: BillingUploadReducer })

      cb(null, BillingUploadContainer)
    }, 'BillingUploadContainer')
  }
})
