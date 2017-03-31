import WareHouseInventory from './components/WareHouseInventory';
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'
// Sync route definition
export default store => ({
  path: 'warehouseInventory',
  component: WareHouseInventory,
  indexRoute: {
    getComponent(nextState, cb) {
      /*  Webpack - use 'require.ensure' to create a split point
       and embed an async module loader (jsonp) when bundling   */
      require.ensure([], (require) => {
        /*  Webpack - use require callback to define
         dependencies for bundling   */
        const inventoryRecords = require('./containers/inventoryRecordsContainers').default
        const getInventoryRecords = require('./modules/getInventoryRecords').default
        const beginInventoryRecords = require('./modules/beginInventoryRecords').default
        const endInventoryRecords = require('./modules/endInventoryRecords').default

        injectReducer(store, {
          key: 'inventoryRecords',
          reducer: combineReducers({
            getInventoryRecords,
            beginInventoryRecords,
            endInventoryRecords
          })
        });

        /*  Return getComponent   */
        cb(null, inventoryRecords)

        /* Webpack named bundle   */
      }, 'inventoryRecords')
    }
  },
  childRoutes: [
    {
      path: 'printInventoryRecords',
      getComponent(nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
          /*  Webpack - use require callback to define
           dependencies for bundling   */
          const printInventoryRecords = require('./containers/printInventoryRecordsContainers').default;
          const printInventoryRecordsReducer = require('./modules/printInventoryRecords').default;

          injectReducer(store, { key: 'printInventoryRecords', reducer: printInventoryRecordsReducer });

          /*  Return getComponent   */
          cb(null, printInventoryRecords);

          /* Webpack named bundle   */
        }, 'printInventoryRecords')
      }
    }
  ]
})
