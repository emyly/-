import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'
import ReceivingChildRouter from './components/ReceivingChildRouter';
import ReceivingWarehousing from './components/ReceivingWarehousing';
import RecevingWareDetail from './containers/RecevingWareDetailContainer';
import RecevingStorage from './containers/RecevingStorageContainer';

// Sync route definition
export default store => ({
  path: 'receivingWarehousing',
  component: ReceivingChildRouter,
  indexRoute: { component: ReceivingWarehousing },
  childRoutes: [
    {
      path: 'RecevingWareDetail/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const RecevingWareDetailContainer = require('./containers/RecevingWareDetailContainer').default
          const reducer = require('./modules/recevingWareDetail').default
          injectReducer(store, { key: 'recevingWareDetail', reducer })
          cb(null, RecevingWareDetailContainer)
        }, 'recevingWareDetail')
      },

    },
    {
      path: 'RecevingStorage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const RecevingStorageContainer = require('./containers/RecevingStorageContainer').default


          cb(null, RecevingStorageContainer)
        }, 'recevingStorage')
      },
    }

  ]

})
