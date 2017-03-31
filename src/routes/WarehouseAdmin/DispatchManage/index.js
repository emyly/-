import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

export default store => ({
  path: 'dispatchManage',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const DispatchManage = require('./containers/DispatchManageContainer').default
      const dispatchManage = require('./modules/dispatchManage').default
      const dispatchManageAlert = require('./modules/dispatchManageAlert').default
      const dispatchManageVerify = require('./modules/dispatchManageVerify').default
      injectReducer(store, {
        key: 'dispatchManage',
        reducer: combineReducers({
          dispatchManage,
          dispatchManageAlert,
          dispatchManageVerify
        })
      })
      cb(null, DispatchManage)
    }, 'dispatchManage')
  }
})
