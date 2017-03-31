/**
 * Created by sjf on 2016/11/1.
 */

// import Sale from "./components/Sale"
// export default {
//   path:'sale',
//   component:Sale
// }
import { injectReducer } from 'store/reducers'
import { combineReducers } from 'redux'

export default store => ({
  path: 'sale',

  /* Async getComponent is only invoked when route matches */
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      /* component */
      const sale = require('./containers/SaleContainer').default;

      /* reducers */
      const fecthSalelist = require('./modules/Sale').default;
      const agencyList = require('./modules/Agency').default;
      const creatList = require('./modules/Creat').default;
      const editList = require('./modules/Edit').default;

      /* Add the reducers to the store on key 'employee' */
      injectReducer(store, {
        key: 'sale',
        reducer: combineReducers({
          fecthSalelist,
          agencyList,
          creatList,
          editList
        })
      });
      /* Return getComponent */
      callback(null, sale);

      /* webpack named bundle */
    }, 'sale')
  }
})

