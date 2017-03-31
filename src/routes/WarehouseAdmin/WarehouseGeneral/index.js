/**
 * Created by chenming on 2016/12/1.
 */
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'
import WarehouseGeneral from './components/WarehouseGeneral';
import ChooseWarehouse from './components/ChooseWarehouse';
import ChooseProduction from './components/ChooseProduction';
import ChooseWarehouseContainer from './containers/ChooseWarehouseContainer';


// Sync route definition
export default store => ({
  path: 'warehouseGeneral',
  component: WarehouseGeneral,
  // getComponent (nextState, cb) {
  //   require.ensure([], (require) => {
  //     const ChooseWarehouseContainer = require('./containers/ChooseWarehouseContainer').default;
  //     // const reducer = require('./modules/chooseWarehouse').default
  //     injectReducer(store,
  //       {
  //         key: 'warehouseGeneral',
  //         reducer: combineReducers({
  //           ChooseWarehouseContainer
  //         })
  //       });
  //     cb(null, WarehouseGeneral)
  //   }, 'WarehouseGeneral')
  // },

  indexRoute: { component: ChooseWarehouseContainer },
  childRoutes: [
    {
      // path:'ChooseProduction',
      // component : ChooseWarehouseContainer
      // getComponent (nextState, cb) {
      //   require.ensure([], (require) => {
      //     const WarehouseDetailContainer = require('./containers/ChooseWarehouseContainer').default
      //     const reducer = require('./modules/chooseWarehouse').default
      //     injectReducer(store, {key: 'WarehouseGeneral',reducer})
      //     cb(null, WarehouseDetailContainer)
      //   }, 'WarehouseGeneral')
      // },

    },

  ],

})
