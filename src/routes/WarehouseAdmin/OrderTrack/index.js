/**
 * Created by liuyali on 2016/12/14.
 */

import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'OrderTrack',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        const OrderTrack = require('./containers/OrderTrackContainer').default
        const OrderTrackReducer = require('./module/OrderTrack').default

        injectReducer(store, {
          key: 'OrderTrackData',
          reducer: OrderTrackReducer
        });

        cb(null, OrderTrack)
      }, 'OrderTrack')
    }
  },
  // childRoutes:[
  //   {
  //     path:'getInventoryGoodDetail',
  //     component:CheckInventoryGoodDetail
  //   }
  // ]
});
