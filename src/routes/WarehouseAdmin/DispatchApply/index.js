import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

export default store => ({
  path: 'dispatchApply',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const DispatchApply = require('./containers/DispatchApplyContainer').default
      const dispatchApply = require('./modules/dispatchApply').default
      const dispatchApplyAlert = require('./modules/dispatchApplyAlert').default
      const dispatchApplyDetail = require('./modules/dispatchApplyDetail').default

      injectReducer(store, {
        key: 'dispatchApply',
        reducer: combineReducers({
          dispatchApply,
          dispatchApplyAlert,
          dispatchApplyDetail
        })
      })
      cb(null, DispatchApply)
    }, 'dispatchApply')
  }
})
