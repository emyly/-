import { injectReducer } from 'store/reducers'

// Sync route definition
export default store => ({
  path: 'gainTempCredit',
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const CreditGainTemp = require('./containers/CreditGainTempContainer').default;
      const reducer = require('./modules/creditGainTemp').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'creditGainTemp', reducer });

      /*  Return getComponent   */
      cb(null, CreditGainTemp);

      /* Webpack named bundle   */
    }, 'CreditGainTemp')
  }
})

