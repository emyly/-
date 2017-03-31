import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'bdMapDemo',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const bdMap = require('./containers/BdMapDemoContainer').default;
      const reducer = require('./modules/BdMapDemoModule').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'bdMap', reducer });

      /*  Return getComponent   */
      cb(null, bdMap);

      /* Webpack named bundle   */
    }, 'bdMap');
  },
});
