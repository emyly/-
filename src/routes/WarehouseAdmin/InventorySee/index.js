/**
 * Created by liuyali on 2016/12/2.
 */
import { injectReducer } from 'store/reducers'
import CheckInventoryGoodDetail from './components/CheckinventoryGoodDetail'

export default store => ({
  path: 'inventorySee',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        const inventorySee = require('./container/InventorySeeContainer').default
        const inventorySeeReducer = require('./modules/inventorySee').default

        injectReducer(store, {
          key: 'inventorySeeData',
          reducer: inventorySeeReducer
        });

        cb(null, inventorySee)
      }, 'inventorySee')
    }
  },
  childRoutes: [
    {
      path: 'getInventoryGoodDetail',
      component: CheckInventoryGoodDetail
    }
  ]
});
