import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'multiTreeDemo',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const mtree = require('./containers/MultiTreeDemoContainer').default;
      const reducer = require('./modules/MultiTreeDemoModule').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'mtree', reducer });

      /*  Return getComponent   */
      cb(null, mtree);

      /* Webpack named bundle   */
    }, 'mtree');
  },
});
