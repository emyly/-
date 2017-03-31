/**
 * Created by niexq on 17/3/25.
 */
import GoodsTransferListContainer from './containers/GoodsTransferListContainer';
import GoodsTransferRouter from './components/GoodsTransferRouter';
import GoodsTransferDetailContainer from './containers/GoodsTransferDetailContainer';
import GoodsTransferOperatingContainer from './containers/GoodsTransferOperatingContainer';

import { injectReducer } from 'store/reducers';
import { combineReducers } from 'redux'

// Sync route definition
export default store => ({
  path: 'goodsTransfer',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const goodsTransferList = require('./modules/goodsTransferList').default;
      const goodsTransferDetail = require('./modules/goodsTransferDetail').default;
      const goodsTransferOperating = require('./modules/goodsTransferOperating').default;

      injectReducer(store, {
        key: 'goodsTransfer',
        reducer: combineReducers({
          goodsTransferList,
          goodsTransferDetail,
          goodsTransferOperating
        })
      });
      cb(null, GoodsTransferRouter);
    }, 'goodsTransfer')
  },
  indexRoute: { component: GoodsTransferListContainer },
  childRoutes: [
    {
      path: ':id',
      component: GoodsTransferDetailContainer
    },
    {
      path: 'operating/space',
      component: GoodsTransferOperatingContainer
    }
  ]
})

