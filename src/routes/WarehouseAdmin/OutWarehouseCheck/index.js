

import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'
import OutWarehouseCheck from './components/OutWarehouseCheck';
import OutWarehouseCheckSummary from './components/OutWarehouseCheckSummary';
import OutWarehouseCheckDetail from './containers/OutWarehouseCheckDetailContainer';


// Sync route definition
export default store => ({
  path: 'outWarehouseCheck',
  component: OutWarehouseCheck,

  indexRoute: { component: OutWarehouseCheckSummary },
  childRoutes: [
    {
      path: 'outWarehouseCheckDetail/:id',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          const OutWarehouseCheckDetailContainer = require('./containers/OutWarehouseCheckDetailContainer').default
          const reducer = require('./modules/outWarehouseCheckDetail').default
          injectReducer(store, { key: 'outWarehouseCheckDetail', reducer })
          cb(null, OutWarehouseCheckDetailContainer)
        }, 'outWarehouseCheckDetail')
      },

    },

  ],

})

